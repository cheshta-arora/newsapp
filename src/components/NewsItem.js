import React, { Component } from 'react'


export class NewsItem extends Component {
  render() {
    let{title,description,imageUrl, newsUrl, author , date , source }= this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{display:'flex', 
        justifyContent:'flex-end',
        position:'absolute',right:0}}>
            <span class=" badge rounded-pill bg-danger" >
          {source}
        </span>
        </div>
      <img src={imageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title"> {title}...</h5>
        <p className="card-text">{description}...</p>
      
        
        <p className='card-text'><small className="text-muted"></small>by { !author?"unknown":author}on {new Date(date).toGMTString()}</p>
        <a href={newsUrl} target="_blank"className="btn btn-sm btn-dark">Read more</a>
      </div>
    </div></div>
    )
  }
}

export default NewsItem