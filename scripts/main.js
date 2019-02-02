(function(window, document, undefined){

    window.onload = init;
    
})(window, document, undefined);

const h = 1e-10;

function init()
{
    var initialForm = document.getElementById("initial");
    var iterationsForm = document.getElementById("iterations");
    var fxForm = document.getElementById("fx");
    var submitButton = document.getElementById("submit");
    iterationsForm.onchange = validateIterationsForm;
}

function validateIterationsForm(change)
{
    var form = change.target;
    if(form.value % 1 != 0)
    {
        form.value = Math.round(form.value)
    }
    if(form.value < 1)
    {
        form.value = 1;
    }
}

function getFx()
{
    return document.getElementById("fx").value;
}

function getInitial()
{
    return document.getElementById("initial").value;
}

function getIterations()
{
    return document.getElementById("iterations").value;
}

function getDx(fx)
{
    return "((" + fx.replace("x","(x+" + h + ")") + ") - (" + fx.replace("x","(x-" + h + ")") + "))/(2*" + h + ")";
}

function approximate(fx, x)
{
    var dx = getDx(fx);
    var nom = eval(fx);
    var denom = eval(dx);
    if(denom == 0)
    {
        denom = 0.001;
    }
    return x - (nom/denom);
}

function finalApproximation(fx,initial,iterations)
{
    var x = initial;
    for(var i = 0; i < iterations; i++)
    {
        x = approximate(fx,x);
    }
    return x;
}

function prep(fx)
{
    return fx.replace("^","**");
}

function showResult(result)
{
    document.getElementById("result").innerHTML = result;
}

function calculate()
{
    var fx = getFx();
    fx = prep(fx);
    var initial = getInitial();
    var iterations = getIterations();
    var zero = finalApproximation(fx,initial,iterations);
    showResult(zero.toFixed(5));
}