# Note varie

## BabelProxy

- Per testare l'error handling posso fare la richiesta sbagliata, in modo da ricevere BadRequest in risposta
- Per il momento dall'API di Babelfy ci prendiamo solo i synset ID, poi vediamo se vogliamo aggiungere anche gli score.
- Come error handling faccio semplicemente return in modo che non mi esca 'Uncaught (in promise)' nella console, che non voglio vedere perché avrei due messaggi legati alla stessa eccezione.  
Le eccezioni compaiono comunque nel traceback perché sono lanciate nelle GET, però mi va bene, perché così possiamo catcharle nella facade.  
Il chiamante può inoltre [controllare se il valore restituito dalla funzione è undefined](https://stackoverflow.com/questions/2647867/how-can-i-determine-if-a-variable-is-undefined-or-null) per capire se c'è stato un errore o meno, perché se ci sono errori faccio una return "vuota".

### Problema

Per caricare moduli javascript bisogna farsi servire i file da un server (vedi [qui](https://stackoverflow.com/questions/58211880/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-import)).
Ho risolto installando l'estensione di VSCode 'Live Server'.

## SemanticWordDescription

### Problema

Facendo cambiare meaning con l'utilizzo di meaningPos, potremmo trovarci in situazioni in cui becchiamo un elemento che ha lo stesso significato ma è interpretato in maniera diversa. Ad esempio, il synset `bn:18592848n` ed il synset `bn:00060690n` li troviamo entrambi faceno una query per la parola 'park', solo che il secondo, legato al concetto 'park', è un synset "bello", nel senso che ha gli esempi, è disponibile in diverse lingue etc., mentre il primo è legato alla named entity 'park', quindi non ha nulla: non ha gloss, non ha esempi etc. Quindi abbiamo due opzioni:

1. Chi usa l'oggetto `SemanticWordDescritpion` (la challenge penso), quando richiede i gloss, gli esempi etc. deve controllare che non siano vuoti, e nel caso lo siano deve creare un altro oggetto, cambiando `meaningpos`.
2. Togliamo `meaningPos` di mezzo e restituiamo sempre oggetti con dentro synset relativi a concetti, perché i concetti (nel senso di CONCEPT) dovrebbero essere sempre ben descritti, quindi non dovremmo avere di questi problemi. Questo però introdurrebbe complessità nel trovare significati diversi della stessa parola.

### TODO

- Costruttore: controllare che ogni elemento di targetLangs sia in un formato consentito ('EN', 'ES' etc.)
- Metodi vari: controllare i valori restituiti dall'API di BabelNet, es. che quando le chiedo un synset sia riuscita a trovarlo etc.

## SemanticSentenceDescription

### Sconnessioni dell'API

1. Se provo a [disambiguare](http://babelfy.org/) la frase "Today is a good day for a trip." l'API riconosce tra i match per "good day", anche "goodbye". Io penso che questa cosa non dovrebbe preoccuparci, perché noi giocheremo sempre con parole singole (credo), e se Babelfy assegna più synsetID alla nostra parola (ma non penso possa succedere) allora ci accontentiamo del fatto che tra questi ci sia quello della parola corretta, oppure possiamo considerare solo quello con lo score più alto (ma poi si pone il problema di quale dei tre score presenti nella risposta utilizzare per la valutazione).  
Per il momento comunque ho implementato il metodo assumendo che ad ogni parola sia associato un solo synsetID, se durante i test abbiamo errori aggiustiamo magari.

### TODO

- Controllare nel costruttore che language sia nel formato consentito ('EN', 'IT' etc.) e sia tra i linguaggi supportati.  
Fare lo stesso controllo per targetLanguages in getSemanticWordDescription.

## Todo importanti

- Sistemare codice generate() in example from meaning
- agganciare altre challenge e lingua al front-end
- capire parametri get axios per fargli prendere tutti i synsetID
- la challenge1 non funziona nelle altre lingue
