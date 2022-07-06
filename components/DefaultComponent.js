import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const QUERY = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          medium
        }
        description
        duration
        startDate {
          year
          month
          day
        }
        averageScore
      }
    }
  }
`;

const Insert = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="flex flex-col gap-2 items-center">
      <button
        className="bg-gray-800 text-white font-bold py-2 px-4"
        onClick={async () => {
          setIsLoading(true);
          setIsSuccess(false);
          setIsError(false);

          const res = await fetch("http://localhost:3000/api/insert", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              props.data.Page.media.map((anime) => ({
                title: anime.title.romaji,
                description: anime.description,
              }))
            ),
          });

          setIsLoading(false);
          if (res.ok) {
            setIsSuccess(true);
          } else {
            setIsError(true);
          }
        }}
      >
        Insérer les données en base
      </button>
      {isLoading && <p>Chargement...</p>}
      {isError && <p>Erreur lors de l'insertion...</p>}
      {isSuccess && <p>Animés inserés avec succès...</p>}
    </div>
  );
};

export const DefaultComponent = () => {
  const [page, setPage] = useState(1);

  const query = useQuery(QUERY, {
    variables: {
      page,
      perPage: 10,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (query.loading) {
    return <p>Chargement...</p>;
  }

  if (query.error) {
    return <p>Erreur lors du chargement de la page</p>;
  }

  if (query.data) {
    return (
      <>
        <Insert data={query.data} />
        <div className="flex flex-col gap-10 items-center">
          {query.data?.Page.media.map((anime) => (
            <div key={anime.id} className="w-1/2 flex shadow p-5 gap-5">
              <div className="shrink-0 relative w-36 h-52">
                <Image
                  alt={"cover"}
                  src={anime.coverImage.medium}
                  layout="fill"
                />
                <p className="absolute bg-black opacity-80 border-white border text-white m-2 px-3 font-bold bottom-0">
                  {anime.averageScore}
                </p>
              </div>

              <div className="flex flex-col">
                <h2 className="font-bold text-xl" key={anime.id}>
                  {anime.title.romaji}
                </h2>
                <div className="flex text-gray-500 gap-2">
                  <p className="text-sm">{anime.duration} minutes.</p>
                  <p className="text-sm">
                    Date de premiere diffusion : {anime.startDate.year}-
                    {anime.startDate.month}-{anime.startDate.day}
                  </p>
                </div>
                <p className="text-sm mt-2">{anime.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="bg-gray-800 text-white font-bold py-2 px-4"
            onClick={() => setPage(page + 1)}
            disabled={page === 1}
          >
            précédent
          </button>
          <p className="text-sm">
            Page {query.data.Page.pageInfo.currentPage} /{" "}
            {query.data.Page.pageInfo.lastPage}
          </p>
          <button
            className="bg-gray-800 text-white font-bold py-2 px-4"
            onClick={() => setPage(page + 1)}
            disabled={!query.data.Page.pageInfo.hasNextPage}
          >
            suivant
          </button>
        </div>
      </>
    );
  }
};
