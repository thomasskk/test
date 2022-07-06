import requests as r
import mariadb
import json
import os, sys
import lxml.html

"""
Fonction permettant de récupérer l'URL SensCritique d'un animé
⚠️ Ne pas toucher à cette fonction, elle vous sera utile.
"""
def get_sc_anime_url(anime_name):
    url = f'https://www.senscritique.com/sc2/search/autocomplete.json?query={anime_name}'
    headers = {
        "x-requested-with": "XmlHttpRequest"
    }
    result = r.get(url, headers=headers)
    content_in_json = json.loads(result.content)
    first_result = None
    if len(content_in_json['json']) > 0:
        first_result = content_in_json['json'][0]['url']

    return first_result


"""
Connexion à la base de données
⚠️ Ne pas toucher à cette fonction, elle vous sera utile.
"""
def connect_to_database():
    try:
        connection = mariadb.connect(
            host=os.getenv("DATABASE_HOST"),
            port=int(os.getenv("DATABASE_PORT")),
            user=os.getenv("DATABASE_USER"),
            password=os.getenv("DATABASE_PASSWORD"),
            database=os.getenv("DATABASE_NAME")
        )
        return connection
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        sys.exit(1)

"""
Ajouter votre logique en dessous ⬇️
"""

def main():
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("SELECT title FROM animes")
    animes_title_data = cursor.fetchall()

    for (anime_data) in animes_title_data:
        title = anime_data[0]
        url = get_sc_anime_url(title)
        if url is not None:
            html = r.get(url)
            doc = lxml.html.fromstring(html.content)
            rating = doc.xpath('//*[@id="__next"]/div[1]/div/main[1]/div/div[3]/div/div/div[2]/div/div[2]/div[3]/div[1]/div/text()')[0]
            cursor.execute(f"UPDATE animes SET rating = %s WHERE title = %s", (float(rating), title))
            connection.commit()
            print(f"{title} ajouté à la base de données")
        else:
            print(f"{title} n'a pas été trouvé sur SensCritique")
    connection.close()
    print("Done")
   
if __name__ == "__main__":
    main()
