import React from 'react';
import Header from "./Header"
import Feed from './Feed';


function Home({posts}) {
  return (
      <div>
          <Header />
          <Feed posts={posts} />
      </div>
  );
}

export default Home;
