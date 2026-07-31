/**
 * Phone Recommender - Frontend JavaScript
 * Gerencia filtros e exibição dos resultados de recomendação de celulares.
 */

document.addEventListener('DOMContentLoaded', () => {
    carregarFiltros();
    
    const form = document.getElementById('filter-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        buscarCelulares();
    });

    document.getElementById('btn-limpar').addEventListener('click', limparFiltros);

    // Buscar automaticamente ao carregar
    buscarCelulares();
});

/**
 * Carrega as opções de filtros do backend.
 */
async function carregarFiltros() {
    try {
        const response = await fetch('/api/filtros');
        const data = await response.json();

        // Popular marcas
        const selectMarca = document.getElementById('marca');
        data.marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca;
            option.textContent = marca;
            selectMarca.appendChild(option);
        });

        // Popular anos
        const selectAnoMin = document.getElementById('ano_min');
        const selectAnoMax = document.getElementById('ano_max');
        data.anos.forEach(ano => {
            const optMin = document.createElement('option');
            optMin.value = ano;
            optMin.textContent = ano;
            selectAnoMin.appendChild(optMin);

            const optMax = document.createElement('option');
            optMax.value = ano;
            optMax.textContent = ano;
            selectAnoMax.appendChild(optMax);
        });

        // Atualizar placeholder de preço
        document.getElementById('preco_min').placeholder = `Mín: R$ ${data.preco_min}`;
        document.getElementById('preco_max').placeholder = `Máx: R$ ${data.preco_max}`;
        document.getElementById('price-range-text').textContent = 
            `R$ ${data.preco_min.toLocaleString('pt-BR')} - R$ ${data.preco_max.toLocaleString('pt-BR')}`;

    } catch (error) {
        console.error('Erro ao carregar filtros:', error);
    }
}

/**
 * Coleta os filtros e busca celulares recomendados.
 */
async function buscarCelulares() {
    const container = document.getElementById('results-container');
    const countEl = document.getElementById('results-count');

    // Mostrar loading
    container.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner"></i>
            <p>Buscando celulares...</p>
        </div>
    `;

    const filtros = {
        marca: document.getElementById('marca').value,
        preco_min: document.getElementById('preco_min').value || null,
        preco_max: document.getElementById('preco_max').value || null,
        ano_min: document.getElementById('ano_min').value || null,
        ano_max: document.getElementById('ano_max').value || null,
        ram_min: document.getElementById('ram_min').value || null,
        armazenamento_min: document.getElementById('armazenamento_min').value || null,
        tela_min: document.getElementById('tela_min').value || null,
        bateria_min: document.getElementById('bateria_min').value || null,
        camera_min: document.getElementById('camera_min').value || null,
        cinco_g: document.getElementById('cinco_g').checked,
        nfc: document.getElementById('nfc').checked,
        resistencia_agua: document.getElementById('resistencia_agua').checked,
        ordenar_por: document.getElementById('ordenar_por').value
    };

    try {
        const response = await fetch('/api/recomendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filtros)
        });

        const data = await response.json();

        countEl.textContent = `${data.total} celular(es) encontrado(s)`;

        if (data.celulares.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search-minus"></i>
                    <p>Nenhum celular encontrado com esses filtros.</p>
                    <p style="font-size: 0.9rem; margin-top: 8px; opacity: 0.7;">Tente ajustar os critérios de busca.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = data.celulares.map(phone => criarCardHTML(phone)).join('');

    } catch (error) {
        console.error('Erro ao buscar celulares:', error);
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erro ao buscar celulares. Tente novamente.</p>
            </div>
        `;
    }
}

/**
 * Cria o HTML de um card de celular.
 */
function criarCardHTML(phone) {
    const tags = [];
    if (phone.cinco_g) tags.push('<span class="tag tag-5g">5G</span>');
    if (phone.nfc) tags.push('<span class="tag tag-nfc">NFC</span>');
    if (phone.resistencia_agua) tags.push('<span class="tag tag-water"><i class="fas fa-tint"></i> IP67/68</span>');

    return `
        <div class="phone-card">
            <div class="phone-card-image">
                <img src="${phone.imagem}" alt="${phone.nome}" 
                     onerror="this.parentElement.innerHTML='<i class=\\'fas fa-mobile-alt no-image\\'></i>'" 
                     loading="lazy">
            </div>
            <div class="phone-card-body">
                <div class="phone-card-brand">${phone.marca}</div>
                <div class="phone-card-name">${phone.nome}</div>
                <div class="phone-card-price">R$ ${phone.preco.toLocaleString('pt-BR')}</div>
                <div class="phone-card-description">${phone.descricao}</div>
                
                <div class="phone-card-specs">
                    <div class="spec-item">
                        <i class="fas fa-microchip"></i>
                        <span>${phone.processador}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-memory"></i>
                        <span>${phone.ram} GB RAM</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-hdd"></i>
                        <span>${phone.armazenamento} GB</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-battery-full"></i>
                        <span>${phone.bateria} mAh</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-camera"></i>
                        <span>${phone.camera_principal} MP</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-expand"></i>
                        <span>${phone.tela}"</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-calendar"></i>
                        <span>${phone.ano_lancamento}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-cog"></i>
                        <span>${phone.sistema}</span>
                    </div>
                </div>

                <div class="phone-card-tags">
                    ${tags.join('')}
                </div>
            </div>
        </div>
    `;
}

/**
 * Limpa todos os filtros e recarrega os resultados.
 */
function limparFiltros() {
    document.getElementById('marca').value = 'todas';
    document.getElementById('preco_min').value = '';
    document.getElementById('preco_max').value = '';
    document.getElementById('ano_min').value = '';
    document.getElementById('ano_max').value = '';
    document.getElementById('ram_min').value = '';
    document.getElementById('armazenamento_min').value = '';
    document.getElementById('tela_min').value = '';
    document.getElementById('bateria_min').value = '';
    document.getElementById('camera_min').value = '';
    document.getElementById('cinco_g').checked = false;
    document.getElementById('nfc').checked = false;
    document.getElementById('resistencia_agua').checked = false;
    document.getElementById('ordenar_por').value = 'preco_asc';

    buscarCelulares();
}
