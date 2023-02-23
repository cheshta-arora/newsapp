import React, { Component } from "react";
import NewsItem from "./NewsItem";
import sample from "./sampleOutput.json";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
{/*article:sample.articles*/ }

export class News extends Component{
  constructor(props) {
    super(props);
    document.title=`${this.capitalize(this.props.category)}-NewsApp`;
    }
   capitalize=(string)=>{
     return string.charAt(0).toUpperCase() + string.slice(1);
   }
  static defaultProps ={
    country: 'in',
    pageSize: 8, 
    category: 'general', 
    
  }
  static propTypes={
      country: PropTypes.string, 
      pageSize: PropTypes.number,
      category: PropTypes.string ,
      title: PropTypes.string
  }
 state= {

   articles: [] ,
      loading:true,
      page:1,
      totalResults:0
    
 }
 
  async updateNews(){ 
    this.props.setProgress(4);
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=7527e719c75a40e7b02bdbaff8d43031&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  this.props.setProgress(30);
  this.setState({loading:true});
  let parsedData = await data.json()
  this.props.setProgress(70);
  console.log(parsedData);

  this.setState({ articles:parsedData.articles , 
    totalResults: parsedData.totalResults, 
  loading: false})
  this.props.setProgress(100);

  }
  fetchMoreData = async() => {
    this.setState({page: this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=7527e719c75a40e7b02bdbaff8d43031&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles:this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults, 
    })
   
  };
   async componentDidMount(){
     this.updateNews();
   }
    render(){
        return(
          <>
              <h1 className="text-center" style={{margin:'35px 0px'}}>Newsapp-Top {this.capitalize(this.props.category)} Headlines</h1>
              { this.state.loading && <Spinner/>}
             <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
            <div className="container">
            <div className="row">
               
                { this.state.articles.map((element)=>
                  <div className="col-md-4" key={element.url}>
                   <NewsItem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                   </div>    
                   )}
                   </div>
                   </div>
                   </InfiniteScroll>
              
          </>
          
        )
    }
}
            
export default News 