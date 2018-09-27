const apiKey = 'uvay2vlHKcfFed9y76-qcCiWDwNz86zxfIDuq1G60-IkMdlnhUifq9H5JkrbOv66uucx1uDt4WHA_PB2cLBeB0D7mjBBciXXO0sp8QqmvuQYj3t6YIN_ay7-LyWsW3Yx';

// const corsAnywherePrefix = 'https://cors-anywhere.herokuapp.com/';
//const url = 'https://api.yelp.com/v3/businesses/search';
// const setYelpAPIParams = (term, location, sortBy) => `?term=${term}&location=${location}&sort_by=${sortBy}`;

export const Yelp = {
  search(term, location, sortBy) {
    return fetch(
      // corsAnywherePrefix + url + setYelpAPIParams(term, location, sortBy),
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization : `Bearer: ${apiKey}`
        }
      }
    ).then(
      response => response.json()
    ).then(
      function(jsonResponse) {
        if (jsonResponse.businesses) {
          console.log('I found a jsonResponse.businesses!');
          jsonResponse.businesses.map(
            function(business) {
              return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories[0].title,
                rating: business.rating,
                reviewCount: business.review_count
              }
            }
          );
        } else {
          console.log('oops');
          throw('I did not find a jsonResponse.businesses!');
        }
      }
    );
  },

};
