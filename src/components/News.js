import React, { Component } from "react";
import NewsItem from "./NewsItem";
import sample from "./sampleOutput.json"

export class News extends Component{
 state= {
      articles:sample.articles,
      loading:false

  }
    render(){
        return(
          <div className="container my-3">
              <h2>Newsapp-Top Headlines</h2>
            <div className="row">
               
                {this.state.articles.map((element)=>
                  <div className="col-md-4">
                   <NewsItem key={element.urlToImage} title={element.title} description={element.description} imageUrl={element.urlToImage}/>
                   </div>    
                   )}
      
                        
           </div>
          </div>
        )
    }
}
            
export default News 