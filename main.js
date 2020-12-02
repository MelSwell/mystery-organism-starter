// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


const pAequorFactory = (specimenNumber, dna) => {
  return ({
    specimenNumber: specimenNumber,
    dna: dna,
    mutate(){ //Changes a random base in this specimen's dna to another valid base
        console.log(`Current bases are: ${this.dna}`);
      let i = Math.floor(Math.random() * this.dna.length);
        console.log(`Finding base at index ${i}`);
      let oldBase = this.dna[i];
        console.log(`Preparing to replace ${oldBase} at index ${i}`);
      let altBases = ['A', 'B', 'C', 'D'];
       altBases.splice(altBases.indexOf(oldBase), 1);
      let mutatedBase = altBases[Math.floor(Math.random() * 3)];
        console.log(`Replacing base: ${oldBase} at index ${i} with base: ${mutatedBase}`);
       return this.dna.splice(i, 1, mutatedBase);
    },
    compareDNA(otherPAequor){ //compares this specimen's dna with provided specimen's dna; returns the percent match
      let matchCount = 0;
      for (let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === otherPAequor.dna[i]){
          matchCount++;
        }
      }
      console.log(`Matches: ${matchCount}`);
      let percent = ((matchCount / this.dna.length) * 100).toFixed(2);
      return console.log(`The two specimens have ${percent}% DNA in common.`)
    },
    willLikelySurvive(){ //Examines this specimen's DNA for 'C' or 'G' bases and determines likelihood of survival
      let cgCount = 0;
      for (let i = 0; i < this.dna.length; i++){
        if (this.dna[i] === 'C' || this.dna[i] === 'G'){
          cgCount++;
        }
      }
      //console.log(cgCount);
      let percentCorG = (cgCount / this.dna.length)*100;
      //console.log(percentCorG); 
        if (percentCorG >= 60){
          return true
        }
        return false
    },
    complementStrand(){ // Creates a complementary DNA strand
      let complementStrand = [];
      for(let base of this.dna){
        switch(base){
         case 'A':
           complementStrand.push('T');
           break;
         case 'T':
           complementStrand.push('A');
           break;
         case 'C':
           complementStrand.push('G');
           break;
         case 'G':
           complementStrand.push('C');
           break;      
      }
    }
    return complementStrand;
   }
  });
};

let batch = [];
let idCounter = 1;
while (batch.length < 30){
  let tempPAequor = pAequorFactory(idCounter, mockUpStrand());
  if(tempPAequor.willLikelySurvive()){
    batch.push(tempPAequor);
    idCounter++;
  }
} //creates 30 p. Aequors that are all likely to survive and puts them all in 

//console.log(batch);
let spec1 = pAequorFactory(1, mockUpStrand());
//let spec2 = pAequorFactory(2, mockUpStrand());
//console.log(pAequorFactory(2, mockUpStrand()));
//console.log(pAequorFactory(3, mockUpStrand()));
//console.log(spec1.dna); //tests factory function
//spec1.mutate(); //tests mutate()
//console.log(spec1.dna);
//console.log(spec2.dna);
//spec1.compareDNA(spec2);
//console.log(spec1.willLikelySurvive());
console.log(spec1.dna)
console.log(spec1.complementStrand());


