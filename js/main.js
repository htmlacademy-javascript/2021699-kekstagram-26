function randomInteger(min,max){
  if(min>=0 && max>=0 && min<max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
randomInteger();

function lengthCheck (line,maxLength) {
  if(maxLength>=140 && line>=maxLength){
    return(lengthCheck.slice(0,maxLength-1));
  }
  return(false);
}
lengthCheck();
