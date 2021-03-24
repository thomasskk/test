import Image from "next/image";

export const DefaultComponent = () => {
  return (
    <div className={"hello-world"}>
      <Image
        src={"/images/senscritique.png"}
        alt={"logo"}
        width={300}
        height={180}
      />
      <h1>Hello world ! 👋🏻</h1>
      <p>
        Bienvenue sur le test technique SensCritique 🎉
      </p>
      <style jsx>{`
        h1 {
          font-size: 4em;
          font-weight: bold;
          text-align: center;
          line-height: 4em;
          vertical-align: middle;
        }
        p {
          font-weight: bold;
          text-align: center;
          font-size: 2em;
        }
        `
      }
      </style>
    </div>
  )
}