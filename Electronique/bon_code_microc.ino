void setup() {
  pinMode(3, OUTPUT); // Déclaration de la broche n°3 en sortie Digitale PWM
  pinMode(11, OUTPUT); // Déclaration de la broche n°11 en sortie Digitale PWM
  pinMode(12, OUTPUT); // Déclaration de la broche n°12 en sortie Digitale
  pinMode(13, OUTPUT); // Déclaration de la broche n°13 en sortie Digitale
  pinMode(5, INPUT); 
  pinMode(6, INPUT); 
}

void loop(){
  int valOuv = digitalRead(4);
  int valFerm = digitalRead(7);
  if(valOuv==HIGH){
    int i=0;
    while(i!=150){
      // Pas n°1 | Sortie B- du Shield Moteur -> Bobine A du moteur pas à pas
      digitalWrite(12, HIGH);
      digitalWrite(13, LOW);  
      analogWrite(3, 0);
      analogWrite(11, 255);
      delay(8);
        
      // Pas n°2 | Sortie A- du Shield Moteur -> Bobine C du moteur pas à pas
      digitalWrite(12, LOW);
      digitalWrite(13, HIGH);   
      analogWrite(3, 255);
      analogWrite(11, 0);
      delay(8); 
      
      // Pas n°3 | Sortie B+ du Shield Moteur -> Bobine B du moteur pas à pas
      digitalWrite(12, LOW);
      digitalWrite(13, HIGH);  
      analogWrite(3, 0);
      analogWrite(11, 255);
      delay(8); 
      
      // Pas n°4 | Sortie A+ du Shield Moteur -> Bobine D du moteur pas à pas
      digitalWrite(12, HIGH);
      digitalWrite(13, LOW);   
      analogWrite(3, 255);
      analogWrite(11, 0);
      delay(8); 
      i++;
    }
    delay(1000);
  }
  else{
    if(valFerm==HIGH){
      int i=0;
      while(i!=150){
        // Commande moteur pas à pas Bipolaire 4 fils en Mode Wave Sens inverse
        // Pas n°1 | Sortie A+ du Shield Moteur -> Bobine D du moteur pas à pas
        digitalWrite(12, HIGH);
        digitalWrite(13, LOW);   
        analogWrite(3, 255);
        analogWrite(11, 0);
        delay(8); 
        
        // Pas n°2 | Sortie B+ du Shield Moteur -> Bobine B du moteur pas à pas
        digitalWrite(12, LOW);
        digitalWrite(13, HIGH);  
        analogWrite(3, 0);
        analogWrite(11, 255);
        delay(8); 
          
        // Pas n°3 | Sortie A- du Shield Moteur -> Bobine C du moteur pas à pas
        digitalWrite(12, LOW);
        digitalWrite(13, HIGH);   
        analogWrite(3, 255);
        analogWrite(11, 0);
        delay(8); 
        
        // Pas n°4 | Sortie B- du Shield Moteur -> Bobine A du moteur pas à pas
        digitalWrite(12, HIGH);
        digitalWrite(13, LOW);  
        analogWrite(3, 0);
        analogWrite(11, 255);
        delay(8);
        i++;
      }
      delay(1000);
    }
  }
}
