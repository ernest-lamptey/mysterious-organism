// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
// Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  //returns pAequor object
  const pAequorFactory = (uniqueNum, arrFunc) => {
    return {
      specimenNum: uniqueNum,
      dna: arrFunc(),
      mutate() {
        let randBaseIndex = Math.floor(Math.random() * this.dna.length)
        let newBase = returnRandBase();
        while (this.dna[randBaseIndex] === newBase) {
          newBase = returnRandBase();
        };
        this.dna[randBaseIndex] = newBase;
        return this
      },
      compareDNA(obj) {
        const length = this.dna.length
        let commons = 0
        for (let i = 0; i < this.dna.length; i++) {
            if (this.dna[i] === obj.dna[i]) {
              commons += 1
            }
          }
        // the line below is the original specification for the project. I'm commenting it out so that I can do something else for the project extension section
        return `specimen ${this.specimenNum} and specimen ${obj.specimenNum} have ${(commons/length) * 100}% DNA in common`
        //return commons/length;
    },
      // returns true if 'C' and 'G' bases accoutn for 60% or more
      willLikelySurvive() {
          const dnaLength = this.dna.length;
          let counter = 0;
          this.dna.forEach(item => {
            if (item === 'C' || item === 'G') {
              counter++;
            }
          })
          const likeliness = counter / dnaLength;
          if (likeliness >= 0.6) {
            return true
          } else {
            return false
          }
      },
      // creates a complement DNA strand of the original
      complementStrand() {
        const compDNAStrand = []
        for (let i = 0; i < this.dna.length; i++) {
            if (this.dna[i] === 'A') {
                compDNAStrand.push('T');
            } else if (this.dna[i] === 'T') {
                compDNAStrand.push('A');
            } else if (this.dna[i] === 'G') {
                compDNAStrand.push('C');
            } else if (this.dna[i] === 'C') {
                compDNAStrand.push('G');
            } else {
                compDNAStrand.push(this.dna[i])
            }
        }
        return compDNAStrand
      },
      // copy of compareDNA method to help the mostRelated() function for the project extension tasks.
      compareDNA2(obj) {
        const length = this.dna.length
        let commons = 0
        for (let i = 0; i < this.dna.length; i++) {
            if (this.dna[i] === obj.dna[i]) {
              commons += 1
            }
          }
        // the line below is the original specification for the project. I'm commenting it out so that I can do something else for the project extension section
        //return `specimen ${this.specimenNum} and specimen ${obj.specimenNum} have ${(commons/length) * 100}% DNA in common`
        return commons/length;
      },  
    }
  };
  
  //creates 30 instances of pAequor
  let pAequorInstances = [];
  for (let i = 0; i < 30; i++) {
    pAequorInstances.push(pAequorFactory(i, mockUpStrand))
  }
 
// to find the most related instances 
  const mostRelated = () => {
    let instance1;
    let instance2;
    let similarity = 0;
    
    function twoMostRelatedInstances () {
        let checker = pAequorInstances.pop();
        pAequorInstances.forEach(instance => {
            if (checker.compareDNA2(instance) > similarity){
                similarity = checker.compareDNA2(instance);
                instance1 = checker;
                instance2 = instance;
            }
        }) 
      }

    for (let i = 0; i < pAequorInstances.length; i++) {
      twoMostRelatedInstances();
    }
    console.log(`The most related instances of pAequor are specimen number ${instance1.specimenNum}
     and specimen number ${instance2.specimenNum}. And they are ${similarity*100}% related.`)
  }

//mostRelated();

