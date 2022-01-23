// Devo monitorar três eventos: 
//Cliquei no mouse = Ativei o modo de desenho 
//Arrasto o mouse (se o modo desenho estiver apertado ele desenha)
// Solto o botão = Desativa o modo desenho.


//Dados iniciais
let currentColor = 'black';
let canvas  = document.querySelector('#tela');
let ctx = canvas.getContext('2d'); //Para desenhar no canvas preciso selecionar um contexto
let draw = false;
let mouseX = 0;
let mouseY = 0;

//Eventos
document.querySelectorAll('.colorArea .color').forEach((item)=>{
    item.addEventListener('click', colorClickEvent);
});

canvas.addEventListener('mousedown', mouseDown); // Criando o evento de clicar no mouse 
canvas.addEventListener('mousemove', mouseMove); // Criando o evento de mover o mouse
canvas.addEventListener('mouseup', mouseUp); // Criando o evento se soltar o mouse
document.querySelector('.clear').addEventListener('click', clear); //Adicionando o evento limpar tela no botão Limpar Quadro


//Funções
function colorClickEvent(event){
    let color = event.target.getAttribute('data-color'); //Detectar qual cor eu cliquei
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active'); //remover a class active de quem tinha ela
    event.target.classList.add('active'); // add active a cor clicada
}
function mouseDown(event){
    draw = true;
    
    //Pegando a posição do meu mouse no momento do click
    mouseX = event.pageX - canvas.offsetLeft;
    mouseY = event.pageY - canvas.offsetTop;
};
function mouseMove(event){
    //pageX/Y permite que eu pegue a posição do meu cursor em relação ao eixo X/Y, levando em consideração toda a tela 
    // offsetLeft/Top pega a distância do elemento canvas até o inicio da tela.
    if(draw){
        drawing(event.pageX , event.pageY);
    }
};
function mouseUp(){
    draw = false;
};
function drawing (x, y){
    //pegando a posição do cursor
    let positionX = x - canvas.offsetLeft;
    let positionY = y - canvas.offsetTop;

    //desenhando
    ctx.beginPath();
    ctx.lineWidth = 5; // Definindo a largura da linha
    ctx.lineJoin = 'round' //Definido o formato da linha
    ctx.moveTo(mouseX,mouseY); // A posição inicial do meu cursor
    ctx.lineTo(positionX, positionY); //A posição final do meu cursor
    ctx.closePath();
    ctx.strokeStyle = currentColor; // coloco a cor na linha
    ctx.stroke(); //finalizando o processo

    //salvando a posição final do cursor
    mouseX = positionX;
    mouseY = positionY;
    
}

//Limpando a tela
function clear (){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
