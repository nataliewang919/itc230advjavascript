var expect=require("chai").expect;
var movies=require("../lib/movies");

describe("Movies", ()=>{
   it("returns requested movie",()=>{
    var result=movies.get("forrest gump");
    expect(result).to.deep.equal({title: "forrest gump",director:"robert",reldate:1994});
         });
    
it ("get fails w/ invalied movie", ()=>{
    var result=movies.get("the circle");
    expect(result).to.be.undefined;
});  
    
it("succefully deleted w/real movie",()=>{
    var result=movies.delete("forrest gump");
    expect(result.deleted).to.be.true;
         });
    
it ("get fails w/ invalied movie", ()=>{
    var result=movies.delete("the circle");
    expect(result.deleted).to.be.false;
});
    
it ("succefully added the movie", ()=>{
    var result=movies.add({title:"gone with the wind",director:"victor",reldate:1939});
    expect(result.added).to.be.ture;    
});
    
it ("fails because the movie is already in the list", ()=>{
    var result=movies.add({title: "forrest gump",director:"robert",reldate:1994});
     expect(result.added).to.be.false;
});
    
});


