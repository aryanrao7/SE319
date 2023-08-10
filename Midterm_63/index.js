const citiesSection = document.querySelector('main');

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const cities = data.cities;
    
    cities.forEach(city => {
      const citySection = document.createElement('section');
      const cityImage = document.createElement('img');
      const cityTitle = document.createElement('h2');
      const cityDescription = document.createElement('p');
      const cityActivities = document.createElement('ul');
      
      cityImage.src = city.image;
      cityTitle.textContent = city.name;
      cityDescription.textContent = city.description;
      
      city.activities.forEach(activity => {
        const activityItem = document.createElement('li');
        activityItem.textContent = activity;
        cityActivities.appendChild(activityItem);
      });
      
      citySection.appendChild(cityImage);
      citySection.appendChild(cityTitle);
      citySection.appendChild(cityDescription);
      citySection.appendChild(cityActivities);
      
      citiesSection.appendChild(citySection);
    });
  })
  .catch(error => {
    console.log(error);
  });
