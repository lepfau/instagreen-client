import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="homepage">
          <h1 className="hometitle">Welcome to Instagreen</h1>
          <h2 className="homesubtitle"> Your plant care starts here...</h2>
        </div>

        <section class="homeinfos">
          <article class="homecontainer">
            <h3> Share </h3>
            <p class="containertext">
              Add your plants and share them with your friends !
            </p>
          </article>
          <article class="homecontainer">
            <h3> Care </h3>
            <p class="containertext">
              Know how to treat your plants and get helped by the community
            </p>
          </article>
          <article class="homecontainer">
            <h3> Exchange </h3>
            <p class="containertext">
              Exchange your plants or offer cuttings to anyone !
            </p>
          </article>
        </section>
      </div>
    );
  }
}

export default Home;
