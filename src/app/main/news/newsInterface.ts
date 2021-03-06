export interface NewsInterface {
  News: {
    news_id: string;
    title: string;
    link: string;
    urlToImage: string;
    imageInLocalStorage: string;
    imageFileName: string;
    pubDate: Date;
    content: string;
    reference: string;
  };
}
