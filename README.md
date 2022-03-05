# Mysterious Organism

Another interesting project that had me referencing documentation so many times, I've realised how important it is. I learnt a few things about DNA ("I guess") and more importantly tested my understanding of objects

I found out my .complementaryStrand() method was mutating the original dna strand which was undesirable. I wanted to have the complementary strand separate from the original. Turns out, I didn't really understand the concepts of passing by reference and passing by value. Once I got that down, I got a very simple solution to my problem. It was an interesting journey.