	
var mocha 	= require("mocha");
var should  = require("should");
var norm = require("../index");

describe('Normalizer', function(){

	before(function(done){
 		norm.loadData(function(){
 			done();
 		});
	});

	describe('Should clean input', function() {

		it("should replace subsitutes", function() {
			norm.clean("Nov 1st I weighed 90 kgs.").should.eql("November 1st I weighed 90 kilograms");
			norm.clean("I shared it on FB w/ friends, ie: you").should.eql("I shared it on Facebook with friends, for example : you");
		});

		it("should expand contractions", function() {
			norm.clean("I'm on the yelow zebra").should.eql("I am on the yellow zebra");
			norm.clean("I'll listen to y'all").should.eql("I will listen to you all");
			norm.clean("do n't make it right").should.eql("do not make it right");
		});

		it("should swap british / canadian words", function() {
			norm.clean("armour axe coloured gold").should.eql("armor ax colored gold");
		});

		it("should fix spelling", function() {
			norm.clean("are we sceduled thrsday for teh restraunt").should.eql("are we scheduled Thursday for the restaurant");
		});

		it("should expand txt speak", function() {
			norm.clean("n").should.eql("~no");
			norm.clean("lol").should.eql("~emolaugh");
			norm.clean("haha").should.eql("~emolaugh");
			norm.clean(":)").should.eql("~emohappy");
		});

		it("should not remove +", function() {
			norm.clean("3+4=7").should.eql("3+4=7");
		});

		it("should remove extra spaces", function() {
			norm.clean("this    is     spaced 		out!").should.eql("this is spaced out!");
		});

	});
});