# Note varie

## BabelProxy

- Per testare l'error handling posso fare la richiesta sbagliata, in modo da ricevere BadRequest in risposta
- Per il momento dall'API di Babelfy ci prendiamo solo i synset ID, poi vediamo se vogliamo aggiungere anche gli score.
- Come error handling faccio semplicemente return in modo che non mi esca 'Uncaught (in promise)' nella console, che non voglio vedere perché avrei due messaggi legati alla stessa eccezione.  
Le eccezioni compaiono comunque nel traceback perché sono lanciate nelle GET, però mi va bene, perché così possiamo catcharle nella facade.  
Il chiamante può inoltre [controllare se il valore restituito dalla funzione è undefined](https://stackoverflow.com/questions/2647867/how-can-i-determine-if-a-variable-is-undefined-or-null) per capire se c'è stato un errore o meno, perché se ci sono errori faccio una return "vuota".

### Problema

Per caricare moduli javascript bisogna farsi servire i file da un server (vedi [qui](https://stackoverflow.com/questions/58211880/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-import)), quindi se non tolgo l'export da davanti alla dichiarazione della classe e l'import nel file di test HTML non funziona nulla.  
Il `type='module'` quando carico `test_index.js` nel file HTML di test è necessario perché lo statement `import` si può usare solo nei moduli, mentre `test_index.js` zerve appunto per avere lo statement di import, perché non posso metterlo direttamente nel file HTML in un tag `script`.
