import React, { Component } from "react";
import "./article.scss";
import StoryblokClient from "storyblok-js-client";
class Article extends Component {
  state = {
    articles: []
  };
  componentDidMount() {
    const client = new StoryblokClient({
      accessToken: "ilnbvJdHDVzOmp7JFIhfPwtt",
      cache: {
        clear: "auto",
        type: "memory"
      }
    });

    client
      .get(`cdn/stories`, {
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
        start_with: "articles/"
      })
      .then(response => {
        console.log("movimpact res ", response);
        this.setState({ articles: response.data.stories });
      });
    /* axios.get("https://jsonplaceholder.typicode.com/photos").then(response => {
      this.setState({ articles: response.data.slice(0, 18) });
    }); */
  }
  render() {
    const articles = this.state.articles.map(article => {
      return (
        <div className="story" key={article.id}>
          <img src={article.content.thumbnail} alt="another" />
          <div className="story__overlay">
            <h4 className="story__overlay-title">{article.content.title}</h4>
            <div className="story__overlay-text">{article.content.summary}</div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="article-section">{articles}</div>
      </div>
    );
  }
}

export default Article;
