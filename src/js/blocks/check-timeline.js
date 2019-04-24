
export default checkTimeLine;

function checkTimeLine() {
  checkTimeLine.bindUIActions();
}

checkTimeLine.bindUIActions = function () {
  document.addEventListener('click', checkCenterLabel);
  document.addEventListener('click', checkDownLabel);  
};


function checkCenterLabel(event) {
  let target = event.target;
  if (target.closest('.btn-center-label')) {
    target.closest('.section').classList.toggle('label-center');

    if (target.textContent == "хочу по центру чек-поинта") {
        target.textContent = "хочу по центру прогресс-линии";
    } else {
      target.textContent = "хочу по центру чек-поинта";
    }

  } else {
    document.querySelectorAll('.section').forEach(function (item) {
      if (target.closest('.btn-center-label')) {
        item.classList.remove('label-center');
      }
    });
  }
}

function checkDownLabel(event) {
  let target = event.target;
  if (target.closest('.btn-down-label')) {
    target.closest('.section').classList.toggle('label-down');

    if (target.textContent == "хочу над таймлайном") {
        target.textContent = "хочу под таймлайном";
    } else {
      target.textContent = "хочу над таймлайном";
    }

  } else {
    document.querySelectorAll('.section').forEach(function (item) {
      if (target.closest('.btn-down-label')) {
        item.classList.remove('label-down');
      }
    });
  }
}