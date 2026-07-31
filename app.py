"""
Phone Recommender - Aplicação Flask para recomendação de celulares.
O usuário filtra por marca, faixa de preço, ano de lançamento e outras configurações.
"""

from flask import Flask, jsonify, request, send_from_directory
from phone_data import PHONES, MARCAS, ANOS

app = Flask(__name__, static_folder="static")


@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory("static", filename)


@app.route("/api/filtros")
def get_filtros():
    """Retorna as opções disponíveis para os filtros."""
    return jsonify({
        "marcas": MARCAS,
        "anos": ANOS,
        "preco_min": min(p["preco"] for p in PHONES),
        "preco_max": max(p["preco"] for p in PHONES),
        "ram_opcoes": sorted(list(set(p["ram"] for p in PHONES))),
        "armazenamento_opcoes": sorted(list(set(p["armazenamento"] for p in PHONES))),
    })


@app.route("/api/recomendar", methods=["POST"])
def recomendar():
    """Filtra e recomenda celulares com base nos critérios do usuário."""
    data = request.get_json()

    resultados = PHONES.copy()

    # Filtro por marca
    marca = data.get("marca")
    if marca and marca != "todas":
        resultados = [p for p in resultados if p["marca"].lower() == marca.lower()]

    # Filtro por faixa de preço
    preco_min = data.get("preco_min")
    preco_max = data.get("preco_max")
    if preco_min is not None:
        resultados = [p for p in resultados if p["preco"] >= int(preco_min)]
    if preco_max is not None:
        resultados = [p for p in resultados if p["preco"] <= int(preco_max)]

    # Filtro por ano de lançamento
    ano_min = data.get("ano_min")
    ano_max = data.get("ano_max")
    if ano_min is not None:
        resultados = [p for p in resultados if p["ano_lancamento"] >= int(ano_min)]
    if ano_max is not None:
        resultados = [p for p in resultados if p["ano_lancamento"] <= int(ano_max)]

    # Filtro por RAM mínima
    ram_min = data.get("ram_min")
    if ram_min is not None and ram_min != "":
        resultados = [p for p in resultados if p["ram"] >= int(ram_min)]

    # Filtro por armazenamento mínimo
    armazenamento_min = data.get("armazenamento_min")
    if armazenamento_min is not None and armazenamento_min != "":
        resultados = [p for p in resultados if p["armazenamento"] >= int(armazenamento_min)]

    # Filtro por tamanho de tela
    tela_min = data.get("tela_min")
    if tela_min is not None and tela_min != "":
        resultados = [p for p in resultados if p["tela"] >= float(tela_min)]

    # Filtro por bateria mínima
    bateria_min = data.get("bateria_min")
    if bateria_min is not None and bateria_min != "":
        resultados = [p for p in resultados if p["bateria"] >= int(bateria_min)]

    # Filtro por câmera principal mínima
    camera_min = data.get("camera_min")
    if camera_min is not None and camera_min != "":
        resultados = [p for p in resultados if p["camera_principal"] >= int(camera_min)]

    # Filtro por 5G
    cinco_g = data.get("cinco_g")
    if cinco_g:
        resultados = [p for p in resultados if p["cinco_g"]]

    # Filtro por NFC
    nfc = data.get("nfc")
    if nfc:
        resultados = [p for p in resultados if p["nfc"]]

    # Filtro por resistência à água
    resistencia_agua = data.get("resistencia_agua")
    if resistencia_agua:
        resultados = [p for p in resultados if p["resistencia_agua"]]

    # Ordenação
    ordenar_por = data.get("ordenar_por", "preco_asc")
    if ordenar_por == "preco_asc":
        resultados.sort(key=lambda p: p["preco"])
    elif ordenar_por == "preco_desc":
        resultados.sort(key=lambda p: p["preco"], reverse=True)
    elif ordenar_por == "ano_desc":
        resultados.sort(key=lambda p: p["ano_lancamento"], reverse=True)
    elif ordenar_por == "camera_desc":
        resultados.sort(key=lambda p: p["camera_principal"], reverse=True)
    elif ordenar_por == "bateria_desc":
        resultados.sort(key=lambda p: p["bateria"], reverse=True)

    return jsonify({
        "total": len(resultados),
        "celulares": resultados
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
