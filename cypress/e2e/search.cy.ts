describe ('SearchPage', () => {
    // this page searches all content: exercises, workouts, programs, tags, and users.
    // the search can be specified to search only one type of content.
    // it searches by querying the api with the search term. it displays the results in a list of cards. 
    // the user can click on a card to view the details of the content. the user can also filter the search results by content type. |
    // the user can also sort the search results by relevance, newest, or oldest. the user can also paginate through the search results. 
    // the user can also clear the search results and filters. the user can also save the search results to a collection. the user can also share the search results. 
    // the user can also report the search results. the user can also create a new content item from the search results. 
    // the user can also follow items and users fro the results
    
    beforeEach(() => {
        cy.visit('http://localhost:3000/search');
    });

    it('should display search page', () => {
        cy.get('h1').contains('Search');
    });

    it('should display search input', () => {
        cy.get('input[type="text"]').should('be.visible');
    });







});