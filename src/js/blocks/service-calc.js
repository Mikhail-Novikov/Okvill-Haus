var calc = (function($, _window) {

  var calc = {};
  var $inputs = $('.calc-form-cnt input[type=text]');
  var $doCalcBtn = $('.js-do-calc');
  var currentDrainRows = 0;
  var calcType = $('.calc-inner-cnt').attr('data-type');
  calc.init = function() {
      $('.calc-form-cnt').on('focus', 'input[type=text]', function() {
          var imgId = 'img-' + $(this).attr('data-image');
          $('#' + imgId).stop().fadeIn(200);
          this.select();
      }).on('blur', 'input[type=text]', function() {
          var imgId = 'img-' + $(this).attr('data-image');
          $('#' + imgId).stop().fadeOut(200);
      }).on('mouseup', 'input[type=text]', function() {
          return false;
      });
      $('.js-calc-reset').click(function(e) {
          e.preventDefault();
          var $formCont = $(this).parents('.calc-form-cnt');
          var $inputs = $formCont.find('input[type=text]');
          $inputs.val('');
          calc.setFieldsType($inputs);
      });
      this.setFieldsType($inputs);
      if (calcType == 'roof') {
          var $select = $('#roof-collection');
          $select.chosen({
              disable_search: true,
              inherit_select_classes: true
          });
          $select.on('change', function() {
              var value = $(this).val();
              $('.roof-color-inputs.active').removeClass('active');
              $('#' + value).addClass('active');
          });
          $('.roof-colors-cnt').on('click', '.color-item a', function(e) {
              e.preventDefault();
              $('.color-item a').removeClass('active');
              $(this).addClass('active');
          });
          $('.color-item a').tooltipster({
              animation: 'fade',
              delay: 50,
              theme: 'docke-theme',
              touchDevices: false,
              trigger: 'hover',
              position: 'bottom',
              functionBefore: function(origin, continueTooltip) {
                  var content = $(origin).find('img').attr('alt');
                  origin.tooltipster('content', content);
                  continueTooltip();
              }
          })
      }
      $doCalcBtn.click(function(e) {

          e.preventDefault();
          var calcType = $(this).attr('rel');
          switch (calcType) {
              case 'siding':
                  calc.computeSiding();
                  break;
              case 'facade-socle':
                  calc.computeFacades('socle');
                  break;
              case 'facade-house':
                  calc.computeFacades('house');
                  break;
              case 'drains':
                  calc.computeDrains();
                  break;
              case 'roof':
                  calc.computeRoof();
                  break;
          }
      });
      switch (calcType) {
          case 'siding':
              this.computeSiding();
              break;
          case 'facade':
              this.computeFacades('socle');
              break;
          case 'drains':
              this.computeDrains();
              break;
          case 'roof':
              this.computeRoof();
              break;
      }
      $(document).on('facade.switch', function(e, paneId, type) {
          var paneType = paneId.split('-')[1];
          calc.computeFacades(paneType);
      });
      var processDrainsFields = function() {
          var $parentField = $(this);
          var $parentCnt = $parentField.parents('.calc-form-row');
          var numChildren = $parentField.val() - 1;
          var $existingRows = $('.drain-add-row');
          var appendRows = function(numRows) {
              for (var i = 0; i < numRows; i++) {
                  var $row = $('<div class="calc-form-row drain-add-row"></div>');
                  var $emptyFieldset = $('<fieldset class="transparent"></fieldset>');
                  var $lengthFieldset = $('<fieldset><label for="canopy-length' + i + '">Длина карнизного свеса, м</label><input class="float canopy-length" id="canopy-length' + i + '" type="text" name="canopy-length' + i + '" data-image="canopy-length"/></fieldset>')
                  var $areaFieldset = $('<fieldset><label for="roof-area' + i + '">Площадь ската, м2</label><input class="float roof-area" id="roof-area' + i + '" type="text" name="roof-area' + i + '" data-image="roof-area"/></fieldset>')
                  $row.append($emptyFieldset).append($lengthFieldset).append($areaFieldset);
                  $parentCnt.after($row);
              }
          }
          if (numChildren > 0) {
              if (numChildren > currentDrainRows) {
                  var delta = numChildren - $existingRows.length;
                  appendRows(delta);
              } else if (numChildren < currentDrainRows) {
                  $existingRows.remove();
                  appendRows(numChildren);
              }
              currentDrainRows = numChildren;
              var $inputs = $('.drain-add-row').find('input');
              calc.setFieldsType($inputs);
          } else if (numChildren == 0) {
              $existingRows.remove();
          } else {
              $existingRows.remove();
              calc.setFieldsType($parentCnt.find('input'));
              $parentField.val('1');
          }
      };
      $('#canopy').blur(processDrainsFields);
      return this;
  };
  calc.setFieldsType = function($inputs) {
      var types = {
          float: {
              deflt: '0.0',
              chars: /[0-9\.]/,
              mask: /^[0-9]+(\.[0-9]+)?$/,
              replace: /([^0-9\.])|(^\.$)/g
          },
          integer: {
              deflt: '0',
              chars: /[0-9]/,
              mask: /^[0-9]+$/,
              replace: /[^0-9]/g
          },
          integer1: {
              deflt: '1',
              chars: /[0-9]/,
              mask: /^[0-9]+$/,
              replace: /[^0-9]/g
          },
          getType: function(node) {
              return $(node).hasClass('float') ? 'float' : ($(node).hasClass('integer') ? 'integer' : ($(node).hasClass('integer1') ? 'integer1' : ''));
          },
          validate: function(node) {
              var type = types.getType(node);
              if (!type) return;
              if (!node.value.match(this[type].mask)) {
                  node.value = node.value.replace(this[type].replace, '');
                  if (node.value == '') node.value = this[type].deflt;
              }
          }
      };
      $inputs.keypress(function(event) {
          if (event.charCode > 0) {
              var char = String.fromCharCode(event.charCode);
              var type = types.getType(this);
              if (!type) return true;
              switch (type) {
                  case 'float':
                      if (char == '.' && this.value.indexOf('.') > -1) return false;
                      break;
              }
              return char.match(types[type].chars) ? true : false;
          }
      }).change(function(event) {
          types.validate(this);
      }).each(function() {
          types.validate(this);
      });
  };
  calc.computeSiding = function() {
      var collectionType =  $('#siding-panel-type').val();
      var collectionArea = {
          BrusD45D: 0.85,
          D5C: 0.78,
          S7: 0.55,
          Woodslide: 0.88,
          BrusD4D: 0.61,
          BrusD6S: 1.1
      };
      var area = $('#area').val(),
          perimeterFloor = $('#perimeter-floor').val(),
          perimeterRoof = $('#perimeter-roof').val(),
          lengthSum = $('#sum').val(),
          outerCornersLength = $('#o-corner').val(),
          innerCornersLength = $('#i-corner').val(),
          resultsString = '',
          resultsObject = {
              mainPanel : {
                  count: 0,
                  name: 'Основная панель',
                  units: 'шт'
              },
              startProfile : {
                  count: 0,
                  name: 'Стартовый профиль',
                  units: 'шт'
              },
              finishProfile : {
                  count: 0,
                  name: 'Финишный профиль',
                  units: 'шт'
              },
              apron : {
                  count: 0,
                  name: 'Наличник',
                  units: 'шт'
              },
              outerCorner : {
                  count: 0,
                  name: 'Наружный угол',
                  units: 'шт'
              },
              innerCorner : {
                  count: 0,
                  name: 'Внутренный угол',
                  units: 'шт'
              }
          };
      resultsObject.mainPanel.count = Math.ceil(area / collectionArea[collectionType]);
      resultsObject.startProfile.count = Math.ceil(perimeterFloor / 3.05);
      resultsObject.finishProfile.count = Math.ceil(perimeterRoof / 3.05);
      resultsObject.apron.count = Math.ceil(lengthSum / 3.66);
      resultsObject.outerCorner.count = outerCornersLength == 0 ? 0 : Math.ceil(outerCornersLength / 3.05);
      resultsObject.innerCorner.count = innerCornersLength == 0 ? 0 : Math.ceil(innerCornersLength / 3.05);
      $('#result-main-panel')[0].firstChild.nodeValue = resultsObject.mainPanel.count + ' ';
      $('#result-start-profile')[0].firstChild.nodeValue = resultsObject.startProfile.count + ' ';
      $('#result-finish-profile')[0].firstChild.nodeValue = resultsObject.finishProfile.count + ' ';
      $('#result-apron')[0].firstChild.nodeValue = resultsObject.apron.count + ' ';
      $('#result-outer-corner')[0].firstChild.nodeValue = resultsObject.outerCorner.count + ' ';
      $('#result-inner-corner')[0].firstChild.nodeValue = resultsObject.innerCorner.count + ' ';
      $.each(resultsObject, function(idx, elt) {
          resultsString += elt.name + ': ' + elt.count + ' ' + elt.units + '\n';
      });
      $('.results-for-form').parent().find('input').val(resultsString);
      return this;
  };
  calc.computeDrains = function() {

      var canopyCount = parseInt($('#canopy').val()),
          houseHeight = parseFloat($('#height').val()),
          innerCornersCount = parseInt($('#i-corner').val()),
          outerCornersCount = parseInt($('#o-corner').val()),
          drainType2 = parseInt($('#drain-panel-type').val()),
          corniceWidth = parseInt($('#cornice-width').val()),
          length = 0,
          area = 0,
          crons = 0,
          vorons = 0,
          conns = 0,
          pipes = 0,
          muf = 0,
          resultsString = '',
          drainsResults = {
              gutterTotal : {
                  count: 0,
                  name: 'Желоба',
                  units: 'шт'
              },
              cornersTotal : {
                  count: 0,
                  name: 'Угловой элемент',
                  units: 'шт'
              },
              gutterBracketTotal : {
                  count: 0,
                  name: 'Кронштейны под желоб',
                  units: 'шт'
              },
              plugsTotal : {
                  count: 0,
                  name: 'Заглушки',
                  units: 'шт'
              },
              funnelsTotal : {
                  count: 0,
                  name: 'Воронки',
                  units: 'шт'
              },
              kneesTotal : {
                  count: 0,
                  name: 'Колено 45° или 72°',
                  units: 'шт'
              },
              headsTotal : {
                  count: 0,
                  name: 'Наконечник',
                  units: 'шт'
              },
              protectsTotal : {
                  count: 0,
                  name: 'Защитная сетка',
                  units: 'шт'
              },
              gutterConnectorsTotal : {
                  count: 0,
                  name: 'Соединитель желобов',
                  units: 'шт'
              },
              pipesTotal : {
                  count: 0,
                  name: 'Трубы',
                  units: 'шт'
              },
              connectorsTotal : {
                  count: 0,
                  name: 'Соединительная муфта',
                  units: 'шт'
              },
              bandagesTotal : {
                  count: 0,
                  name: 'Хомут',
                  units: 'шт'
              }
          },
          str_replace = function(search, replace, subject) {
              return subject.split(search).join(replace);
          };
      $('.canopy-length').each(function(idx, elt) {
          if (parseFloat($(elt).val()) > 0) {
              var value = str_replace(',', '.', $(elt).val());
              var Bi = parseFloat(value);
              length += Bi;
              crons += Math.ceil(Bi / 6 * 10);
              console.log(Bi);
              // conns += Math.ceil(Bi / 3 - 1);
              conns += Math.ceil(Bi / 3 - 1);
          }
      });
      $('.roof-area').each(function(idx, elt) {
          if (parseFloat($(elt).val()) > 0) {
              var value = str_replace(',', '.', $(elt).val());
              var Si = parseFloat(value);
              var Vi = Math.ceil(Si / drainType2);
              area += Si;
              vorons += Vi;
              pipes += Math.ceil((houseHeight + corniceWidth /3) * Vi);
              muf += Math.ceil(houseHeight * Vi / 3 - 1);
          }
      });
      drainsResults.gutterTotal.count = Math.ceil(length / 3);
      drainsResults.gutterBracketTotal.count = crons / 0.5 + canopyCount;
      drainsResults.cornersTotal.count = innerCornersCount + outerCornersCount;
      drainsResults.plugsTotal.count = Math.abs((canopyCount - innerCornersCount - outerCornersCount) * 2);
      drainsResults.funnelsTotal.count = vorons;
      drainsResults.kneesTotal.count = 2 * vorons;
      drainsResults.headsTotal.count = vorons;
      drainsResults.protectsTotal.count = vorons;
      drainsResults.gutterConnectorsTotal.count = conns;
      drainsResults.pipesTotal.count = pipes;
      // drainsResults.connectorsTotal.count = conns;
      drainsResults.connectorsTotal.count = Math.ceil(houseHeight / 1.5 + 1);
      if(houseHeight < 3.1) {
          drainsResults.bandagesTotal.count = 3;
      } else {
          // drainsResults.bandagesTotal.count = Math.ceil((Math.ceil(houseHeight * 2 / 3 + 1)) * vorons);
          drainsResults.bandagesTotal.count = Math.ceil((Math.ceil(houseHeight / 1.5 + 1)) * vorons);
      }
      $('#result-gutter')[0].firstChild.nodeValue = drainsResults.gutterTotal.count + ' ';
      $('#result-corner')[0].firstChild.nodeValue = drainsResults.cornersTotal.count + ' ';
      $('#result-gutter-bracket')[0].firstChild.nodeValue = drainsResults.gutterBracketTotal.count + ' ';
      $('#result-plug')[0].firstChild.nodeValue = drainsResults.plugsTotal.count + ' ';
      $('#result-knee')[0].firstChild.nodeValue = drainsResults.kneesTotal.count + ' ';
      $('#result-head')[0].firstChild.nodeValue = drainsResults.headsTotal.count + ' ';
      $('#result-gutter-connector')[0].firstChild.nodeValue = drainsResults.gutterConnectorsTotal.count + ' ';
      $('#result-funnel')[0].firstChild.nodeValue = drainsResults.funnelsTotal.count + ' ';
      $('#result-protect')[0].firstChild.nodeValue = drainsResults.protectsTotal.count + ' ';
      $('#result-pipe')[0].firstChild.nodeValue = drainsResults.pipesTotal.count + ' ';
      $('#result-connector')[0].firstChild.nodeValue = drainsResults.connectorsTotal.count + ' ';
      $('#result-bandage')[0].firstChild.nodeValue = drainsResults.bandagesTotal.count + ' ';
      $.each(drainsResults, function(idx, elt) {
          resultsString += elt.name + ': ' + elt.count + ' ' + elt.units + '\n';
      });
      $('.results-for-form').parent().find('input').val(resultsString);
      return this;
  };
  calc.computeFacades = function(type) {



      var facadeMeasures = {
          'Berg': {
              area: 0.44,
              height: 0.434
          },
          'Burg': {
              area: 0.42,
              height: 0.445
          },
          'Stein': {
              area: 0.44,
              height: 0.4
          },
          'Fels': {
              area: 0.45,
              height: 0.425
          },
          'Edel': {
              area: 0.37,
              height: 0.4
          },
          'Stern': {
              area: 0.46,
              height: 0.427
          }
      };
      var jProfileLength = 3;
      var innerCornerLength = 3.05;
      switch (type) {
          case 'socle':
              $('.calc-fronton').hide();
              $('.calc-fronton2').hide();
              var texture = $('#socle-panel-type').val(),
                  perimeterSocle = $('#socle-perimeter').val(),
                  doorWidth = $('#socle-door-width').val(),
                  socleHeight = $('#socle-height').val(),
                  socleInnerCorners = $('#socle-i-corner').val(),
                  socleOuterCorners = $('#socle-o-corner').val(),
                  multipleFacadeHeight = facadeMeasures[texture]['height'],
                  i = 0,
                  resultFacadeHeight = 0,
                  resultPerimeterSocle = perimeterSocle - doorWidth,
                  facadeArea = 0,
                  jInner = 0,
                  jStroke = 0,
                  jInnerBase = 0,
                  jStrokeBase = 0,
                  socleInnerCornersTotal = 0,
                  socleString = '',
                  socleResults = {
                      facadesCountTotal : {
                          count: 0,
                          name: 'Панели',
                          units: 'шт'
                      },
                      startCornersTotal : {
                          count: 0,
                          name: 'Старт углов',
                          units: 'шт'
                      },
                      numCornersTotal : {
                          count: 0,
                          name: 'Углы',
                          units: 'шт'
                      },
                      startPanelsTotal : {
                          count: 0,
                          name: 'Старт панели',
                          units: 'шт'
                      },
                      jProfilesTotal : {
                          count: 0,
                          name: 'J-профиль',
                          units: 'шт'
                      },
                      innerCornersTotal : {
                          count: 0,
                          name: 'Углы',
                          units: 'шт'
                      },
                      lProfilesTotal : {
                          count: 0,
                          name: 'L-профиль',
                          units: 'шт'
                      },
                      basePlankTotal : {
                          count: 0,
                          name: 'Базовая планка',
                          units: 'шт'
                      }
                  }
              while (1) {
                  resultFacadeHeight = multipleFacadeHeight * i;
                  if (resultFacadeHeight > socleHeight) break;
                  i++;
              }
              facadeArea = resultPerimeterSocle * resultFacadeHeight;
              jInner = Math.ceil(socleInnerCorners * socleHeight / 3.05);
              jInnerBase = Math.ceil(socleInnerCorners * socleHeight / 2);
              socleInnerCornersTotal = Math.ceil(socleInnerCorners * socleHeight / innerCornerLength);
              jStroke = Math.ceil(resultPerimeterSocle / 3.05);
              jStrokeBase = Math.ceil(resultPerimeterSocle / 2);
              socleResults.facadesCountTotal.count = Math.ceil(1.05 * (facadeArea / facadeMeasures[texture]['area']));
              socleResults.startCornersTotal.count = socleOuterCorners;
              socleResults.numCornersTotal.count = i * socleOuterCorners;
              socleResults.startPanelsTotal.count = Math.ceil(resultPerimeterSocle / 2);
              // socleResults.jProfilesTotal.count = jInner + jStroke;
              socleResults.jProfilesTotal.count = jStroke;
              socleResults.lProfilesTotal.count = jStroke;
              socleResults.basePlankTotal.count = jInnerBase + jStrokeBase;
              socleResults.innerCornersTotal.count = jInner;
              $('#result-facade-panel')[0].firstChild.nodeValue = socleResults.facadesCountTotal.count + ' ';
              $('#result-facade-corners')[0].firstChild.nodeValue = socleResults.numCornersTotal.count + ' ';
              $('#result-facade-start-corners')[0].firstChild.nodeValue = socleResults.startCornersTotal.count + ' ';
              $('#result-facade-start-panel')[0].firstChild.nodeValue = socleResults.startPanelsTotal.count + ' ';
              $('#result-facade-base-plank')[0].firstChild.nodeValue = socleResults.basePlankTotal.count +  ' ';
              $('#result-inner-corner')[0].firstChild.nodeValue = socleResults.innerCornersTotal.count + ' ';

              if(texture == "Stern" || texture == "Stein" || texture == "Fels"){
                  $('#result-facade-l')[0].firstChild.nodeValue = socleResults.lProfilesTotal.count + ' ';
                  $('#result-siding-j')[0].firstChild.nodeValue = 0 + ' ';
                  $('#result-facade-j')[0].firstChild.nodeValue = 0 + ' ';
              } else if (texture == "Edel") {
                  $('#result-siding-j')[0].firstChild.nodeValue = socleResults.jProfilesTotal.count + ' ';
                  $('#result-facade-l')[0].firstChild.nodeValue = 0 + ' ';
                  $('#result-facade-j')[0].firstChild.nodeValue = 0 + ' ';
                  $('#result-facade-base-plank')[0].firstChild.nodeValue = jInnerBase +  ' ';
              } else {
                  $('#result-facade-j')[0].firstChild.nodeValue = socleResults.jProfilesTotal.count + ' ';
                  $('#result-siding-j')[0].firstChild.nodeValue = 0 + ' ';
                  $('#result-facade-l')[0].firstChild.nodeValue = 0 + ' ';
                  $('#result-facade-base-plank')[0].firstChild.nodeValue = jInnerBase +  ' ';
              }

              socleString = 'Текстура: ' + texture + '\n';

              $.each(socleResults, function(idx, elt) {
                  socleString += elt.name + ': ' + elt.count + ' ' + elt.units + '\n';
              });
              $('.results-for-form').parent().find('input').val(socleString);
              break;
          case 'house':
              $('.calc-fronton').show();
              var texture = $('#house-panel-type').val(),
                  perimeterHouse = $('#house-perimeter').val(),
                  wallsHeight = $('#house-height').val(),
                  windowsDoorsArea = $('#house-window-area').val(),
                  houseInnerCorners = $('#house-i-corner').val(),
                  houseOuterCorners = $('#house-o-corner').val(),
                  frontsLength = $('#house-front-length').val(),
                  front1Area = $('#house-front1-area').val(),
                  front2Area = $('#house-front2-area').val(),
                  houseArea = 0,
                  pureArea = 0,
                  numCornersPerCorner = 0,
                  jInnerHouse = 0,
                  jStrokeHouse = 0,
                  numWallPanels = 0,
                  numFrontPanels = 0,
                  jInnerBaseHouse = 0,
                  jStrokeBaseHouse = 0,
                  fronton1 = 0,
                  fronton2 = 0,
                  houseString = '',
                  houseResults = {
                      numCornersTotal : {
                          count: 0,
                          name: 'Углы',
                          units: 'шт'
                      },
                      numPanelsTotal : {
                          count: 0,
                          name: 'Панели',
                          units: 'шт'
                      },
                      startPanelsTotal : {
                          count: 0,
                          name: 'Старт панелей',
                          units: 'шт'
                      },
                      startCornersTotal : {
                          count: 0,
                          name: 'Старт углов',
                          units: 'шт'
                      },
                      jProfilesTotal : {
                          count: 0,
                          name: 'J-профиль',
                          units: 'шт'
                      },
                      lProfilesTotal : {
                          count: 0,
                          name: 'L-профиль',
                          units: 'шт'
                      },
                      basePlankTotal : {
                          count: 0,
                          name: 'Базовая планка',
                          units: 'шт'
                      },
                      innerCornersTotal : {
                          count: 0,
                          name: 'Внутренний угол',
                          units: 'шт'
                      },
                      frontonTotal : {
                          count: 0,
                          name: 'Фронтон',
                          units: 'шт'
                      },
                      frontonTotal2 : {
                          count: 0,
                          name: 'Фронтон 2',
                          units: 'шт'
                      }
                  };
              houseArea = wallsHeight * perimeterHouse;
              pureArea = houseArea - windowsDoorsArea;
              numCornersPerCorner = Math.ceil(wallsHeight / facadeMeasures[texture]['height']);
              // pureHeight = Math.ceil(wallsHeight / facadeMeasures[texture]['height']) * facadeMeasures[texture]['height'];
              // purePanelArea = (houseArea - windowsDoorsArea) * pureHeight;
              jInnerHouse = Math.ceil(wallsHeight * 2 / jProfileLength);
              jStrokeHouse = Math.ceil(frontsLength / jProfileLength);
              jInnerBaseHouse = Math.ceil(houseInnerCorners * wallsHeight / 2);
              jStrokeBaseHouse = Math.ceil(frontsLength / 2);
              numWallPanels = Math.ceil(1.05 * (pureArea / facadeMeasures[texture]['area']));
              numFrontPanels = Math.ceil(1.1 * ((+front1Area + +front2Area) / facadeMeasures[texture]['area']));
              houseResults.numCornersTotal.count = houseOuterCorners * numCornersPerCorner;
              houseResults.numPanelsTotal.count = numWallPanels + numFrontPanels;
              houseResults.startPanelsTotal.count = Math.ceil(perimeterHouse / 2);
              houseResults.startCornersTotal.count = houseOuterCorners;
              // houseResults.jProfilesTotal.count = jInnerHouse + jStrokeHouse;
              // houseResults.jProfilesTotal.count = jInnerHouse + jStrokeHouse;
              houseResults.jProfilesTotal.count = jStrokeHouse;
              houseResults.basePlankTotal.count = jStrokeBaseHouse;
              houseResults.innerCornersTotal.count = Math.ceil(houseInnerCorners * wallsHeight / 3.05);
              $('#result-facade-panel')[0].firstChild.nodeValue = houseResults.numPanelsTotal.count + ' ';
              $('#result-facade-corners')[0].firstChild.nodeValue = houseResults.numCornersTotal.count + ' ';
              $('#result-facade-start-corners')[0].firstChild.nodeValue = houseResults.startCornersTotal.count + ' ';
              $('#result-facade-start-panel')[0].firstChild.nodeValue = houseResults.startPanelsTotal.count + ' ';
              // $('#result-facade-j')[0].firstChild.nodeValue = houseResults.jProfilesTotal.count + ' ';
              $('#result-facade-j')[0].firstChild.nodeValue = houseResults.jProfilesTotal.count + ' ';
              $('#result-facade-l')[0].firstChild.nodeValue = houseResults.lProfilesTotal.count + ' ';
              $('#result-facade-base-plank')[0].firstChild.nodeValue = houseResults.basePlankTotal.count +  ' ';
              $('#result-inner-corner')[0].firstChild.nodeValue = houseResults.innerCornersTotal.count + ' ';

              if(front1Area == front2Area){
                  houseResults.frontonTotal.count = Math.ceil( 1.1 * (front1Area / facadeMeasures[texture]['area']) * 2);
              } else {
                  houseResults.frontonTotal.count = Math.ceil( 1.1 * (front1Area / facadeMeasures[texture]['area']));
                  houseResults.frontonTotal2.count = Math.ceil( 1.1 * (front2Area / facadeMeasures[texture]['area']));
              }
              if(texture == "Stern" || texture == "Stein" || texture == "Fels"){
                  $('#result-facade-l')[0].firstChild.nodeValue = houseResults.jProfilesTotal.count + ' ';
                  $('#result-siding-j')[0].firstChild.nodeValue = 0 + ' ';
                  $('#result-facade-j')[0].firstChild.nodeValue = 0 + ' ';
              } else if (texture == "Edel") {
                  $('#result-siding-j')[0].firstChild.nodeValue = houseResults.jProfilesTotal.count + ' ';
                  $('#result-facade-l')[0].firstChild.nodeValue = 0 + ' ';
                  $('#result-facade-j')[0].firstChild.nodeValue = 0 + ' ';
                  $('#result-facade-base-plank')[0].firstChild.nodeValue = jInnerBaseHouse +  ' ';
              } else {
                  $('#result-facade-j')[0].firstChild.nodeValue = houseResults.jProfilesTotal.count + ' ';
                  $('#result-siding-j')[0].firstChild.nodeValue = 0 + ' ';
                  $('#result-facade-l')[0].firstChild.nodeValue = 0 + ' ';
                  $('#result-facade-base-plank')[0].firstChild.nodeValue = jInnerBaseHouse +  ' ';
              }
              // if(front1Area == front2Area) {
              //     $('#result-facade-fronton-area')[0].firstChild.nodeValue = houseResults.frontonTotal.count + ' ';
              //     $('.calc-fronton2').hide();
              // } else if(front1Area != front2Area) {
              //     $('#result-facade-fronton-area')[0].firstChild.nodeValue = houseResults.frontonTotal.count + ' ';
              //     $('.calc-fronton2').show();
              //     $('#result-facade-fronton-area2')[0].firstChild.nodeValue = houseResults.frontonTotal2.count + ' ';
              // }
              houseString += 'Текстура: ' + texture + '\n';

              $.each(houseResults, function(idx, elt) {
                  houseString += elt.name + ': ' + elt.count + ' ' + elt.units + '\n';
              });
              $('.results-for-form').parent().find('input').val(houseString);
              break;
      }
      return this;
  };
  calc.computeRoof = function() {


      var tileAreas = {
              'Koln': 2.75,
              'Sheffield': 2.75,
              'Nizza': 2.75,
              'Liege': 3.1,
              'Zurich': 3.1,
              'Granada': 2.75,
              'Genue': 2.75,
              'Sapporo': 2.75
          },
          collection = $('#roof-collection').val();

      var roofArea = $('#roof-area').val(), // ГЏГ‹ГЋГ™ГЂГ„Гњ ГЉГђГЋГ‚Г‹Г€
          roofApexLength = $('#roof-apex').val(), // Г„Г‹Г€ГЌГЂ ГЉГЋГЌГњГЉГЂ
          roofValleyLength = $('#roof-valley').val(), // Г„Г‹Г€ГЌГЂ Г…ГЌГ„ГЋГ‚Г›
          roofContactsLength = $('#roof-contacts').val(), // Г„Г‹Г€ГЌГЂ ГЏГђГ€ГЊГ›ГЉГЂГЌГ€Г‰,
          roofBackbonesLength = $('#roof-backbones').val(), // Г„Г‹Г€ГЌГЂ Г•ГђГ…ГЃГ’ГЋГ‚,
          roofApronLength = $('#roof-apron').val(), // Г„Г‹Г€ГЌГЂ ГЉГЂГђГЌГ€Г‡ГЌГ›Г• Г‘Г‚Г…Г‘ГЋГ‚
          roofFrontLength = $('#roof-front').val(), // Г„Г‹Г€ГЌГЂ Г”ГђГЋГЌГ’ГЋГЌГЌГ›Г• Г‘Г‚Г…Г‘ГЋГ‚
          roofValleyNum = $('#roof-valley-num').val(),
          roofFunnelPerimeter = $('#roof-funnel-perimeter').val(),
          coverRollArea = 40,
          tileArea = tileAreas[collection],
          apexLength = 0.498,
          valleyContiguity = parseFloat(roofContactsLength) * 0.05,
          valleyCoverValley = (parseFloat(roofValleyLength) + parseFloat(roofValleyNum) * 0.5) * 0.1,
          valleyCoverFunnel = (parseFloat(roofFunnelPerimeter) + 1.6) * 0.05,
          apexCountInPackage = 22,
          apexStartLineLength = 1,
          apexStartLineInPackage = 22,
          bitumMeterSpend = 0.1,
          bitumHermMeterSpend = 0.75,
          /* nailsCountGont = 32, */
          nailsCountGont = 0.1,
          nailsCountOther = 9,
          nailsCountInKilo = 500,
          apronLength = 2,
          frontLength = 2,
          valleyLength = 10,
          waterRollArea = 75,
          steamRollArea = 75,
          apex = 0,
          start = 0,
          bitumFronts = 0,
          bitumCover = 0,
          bitumApex = 0,
          bitumContacts = 0,
          nailsGont = 0,
          pMats = 0,
          nailsPMats = 0,
          nailsTotalCount = 0,
          roofString = '',
          apexForApexTotal,
          startForApexTotal,
          roofResults = {
              tilesTotal : {
                  count: 0,
                  name: 'Рядовая черепица',
                  units: 'уп.'
              },
              apexTotal : {
                  count: 0,
                  name: 'Коньково-стартовая полоса',
                  units: 'уп.'
              },

              bitumTotal : {
                  count: 0,
                  name: 'Битумная мастика',
                  units: 'л'
              },
              apronTotal : {
                  count: 0,
                  name: 'Планка карнизная',
                  units: 'п/м'
              },
              frontTotal : {
                  count: 0,
                  name: 'Планка фронтонная',
                  units: 'п/м'
              },

              steamTotal : {
                  count: 0,
                  name: 'Пароизоляция',
                  units: 'м2'
              },
               nailsTotal : {
                  count: 0,
                  name: 'Гвозди',
                  units: 'кг'
              },
              valleyTotal : {
                  count: 0,
                  name: 'Ендова',
                  units: 'рул.'
              },
              waterTotal : {
                  count: 0,
                  name: 'Гидроизоляция',
                  units: 'м2'
              },
              coverTotal : {
                  count: 0,
                  name: 'Подкладочный ковер',
                  units: 'м2'
              },
              contiguityTotal : {
                  count: 0,
                  name: 'Планка примыкания',
                  units: 'п/м'
              }

          };
      /* roofResults.coverTotal.count = Math.ceil(1.15 * roofArea / coverRollArea); */
      roofResults.coverTotal.count = Math.ceil(1.15 * roofArea);
      roofResults.tilesTotal.count = Math.ceil( ( +(( roofArea / $("#meter-in-path").val() * 10 ) / 10).toFixed(12) ) * 1.05 );
      apexForApexTotal = (parseFloat(roofApexLength) + parseFloat(roofBackbonesLength)) / apexLength / apexCountInPackage;
      /* apex = Math.ceil((parseFloat(roofApexLength) + parseFloat(roofBackbonesLength)) / apexLength / apexCountInPackage); */
      apex = Math.ceil(apexForApexTotal);
      startForApexTotal = roofApronLength / apexStartLineLength / apexStartLineInPackage;
      /* start = Math.ceil(roofApronLength / apexStartLineLength / apexStartLineInPackage); */
      start = Math.ceil(roofApronLength / apexStartLineLength / apexStartLineInPackage);
      /* roofResults.apexTotal.count = +apex + +start; */
      roofResults.apexTotal.count = Math.ceil(apexForApexTotal+startForApexTotal);
      bitumFronts = (parseFloat(roofApronLength) + parseFloat(roofFrontLength)) * bitumMeterSpend;
      bitumCover = roofResults.coverTotal.count * coverRollArea * bitumMeterSpend;
      bitumApex = roofApexLength * 0.4;
      bitumContacts = (parseFloat(roofValleyLength) + parseFloat(roofContactsLength)) * bitumHermMeterSpend;
      /* roofResults.bitumTotal.count = Math.ceil((bitumFronts + bitumCover + bitumApex + bitumContacts) / 10); */
      // roofResults.bitumTotal.count = Math.ceil(((roofResults.coverTotal.count*0.1)+(roofApronLength*0.1)+(roofFrontLength*0.1)+(roofApexLength*0.2)+(roofValleyLength*0.4)+(roofContactsLength*0.5))*1.05);
      roofResults.bitumTotal.count = Math.ceil(roofArea * 0.1);
      nailsGont = roofArea * nailsCountGont;
      pMats = coverRollArea * roofResults.coverTotal.count + apexLength * apexCountInPackage * apex + parseFloat(roofApronLength);
      nailsPMats = pMats * nailsCountOther;
      nailsTotalCount = nailsGont + nailsPMats;
      /* roofResults.nailsTotal.count = (nailsTotalCount / nailsCountInKilo).toFixed(3); */
      roofResults.nailsTotal.count = Math.ceil(nailsGont);
      roofResults.apronTotal.count = Math.ceil(Math.ceil(parseFloat(roofApronLength)) * 1.03);
      roofResults.frontTotal.count = Math.ceil(Math.ceil(parseFloat(roofFrontLength) / frontLength) * 2 * 1.03);
      // roofResults.valleyTotal.count = Math.ceil((parseFloat(roofValleyLength) + parseFloat(roofContactsLength)) / valleyLength * 1.05);
      if(valleyContiguity != 0 || valleyCoverValley !=0 || valleyCoverFunnel > 0.1 ) {
          roofResults.valleyTotal.count = Math.ceil(valleyContiguity + valleyCoverValley + valleyCoverFunnel);
      } else {
          roofResults.valleyTotal.count = 0;
      }
      /* roofResults.waterTotal.count = Math.ceil(roofArea / waterRollArea * 1.1); */
      roofResults.waterTotal.count = Math.ceil(roofArea * 1.15);
      /* roofResults.steamTotal.count = Math.ceil(roofArea / steamRollArea * 1.1); */
      roofResults.steamTotal.count = Math.ceil(roofArea * 1.15);
      // roofResults.contiguityTotal.count = Math.round((parseFloat(roofContactsLength) * 1.025) * 100) / 100;
      roofResults.contiguityTotal.count = Math.ceil(parseFloat(roofContactsLength) * 1.025);
      $('#result-roof-bitum')[0].firstChild.nodeValue = roofResults.bitumTotal.count + ' ';
      $('#result-roof-apron')[0].firstChild.nodeValue = Math.ceil(roofResults.apronTotal.count) + ' ';
      $('#result-roof-front')[0].firstChild.nodeValue = Math.ceil(roofResults.frontTotal.count) + ' ';
      $('#result-roof-tiles')[0].firstChild.nodeValue = roofResults.tilesTotal.count + ' ';
      $('#result-roof-apex')[0].firstChild.nodeValue = roofResults.apexTotal.count + ' ';

      /* ГЏГ Г°Г®ГЁГ§Г®Г«ГїГ¶ГЁГї */
      $('#result-roof-steam')[0].firstChild.nodeValue = roofResults.steamTotal.count + ' ';
      $('#result-roof-nails')[0].firstChild.nodeValue = roofResults.nailsTotal.count + ' ';
          $('#result-roof-valley')[0].firstChild.nodeValue = roofResults.valleyTotal.count + ' ';
      /* ГѓГЁГ¤Г°Г®ГЁГ§Г®Г«ГїГ¶ГЁГї */
      $('#result-roof-water')[0].firstChild.nodeValue = roofResults.waterTotal.count + ' ';
      /* ГЏГ®Г¤ГЄГ«Г Г¤Г®Г·Г­Г»Г© ГЄГ®ГўВёГ° */
      $('#result-roof-cover')[0].firstChild.nodeValue = roofResults.coverTotal.count + ' ';
      $('#result-roof-contiguity')[0].firstChild.nodeValue = roofResults.contiguityTotal.count + ' ';
      roofString += 'Коллекция: ' + $('#roof-collection').find('option:selected').text() + '\n';
      roofString += 'Цвет: ' + $('.roof-color-inputs.active').find('a.active').find('img').attr('alt') + '\n';

      $.each(roofResults, function(idx, elt) {
          roofString += elt.name + ': ' + elt.count + ' ' + elt.units + '\n';
      });
      $('.results-for-form').parent().find('input').val(roofString);

      return this;
  };
  // $("#socle-panel-type").change(function() {
  //     if($("#socle-panel-type").val() == 'Stern' || $("#socle-panel-type").val() == 'Stein' || $("#socle-panel-type").val() == 'Fels') {
  //         $(".j-profile-text").text('L-профиль');
  //         $('.calc-plank').show();
  //     } else if($("#socle-panel-type").val() == 'Edel'){
  //         $(".j-profile-text").text('Сайдинговый J-профиль');
  //         $('.calc-plank').hide();
  //     } else {
  //         $(".j-profile-text").text('Фасадный J-профиль');
  //         $('.calc-plank').hide();
  //     }
  // });
  $("#roof-collection").change(function() {
      $("#meter-in-path").val(this.options[this.selectedIndex].getAttribute('rel'));
      console.log($("#meter-in-path").val());
  });
  $('#drain-panel-type').change(function(){
     if($('#drain-panel-type').val() == '66') {
      $('.calc-protection').hide();
     } else {
      $('.calc-protection').show();
     }
  });
  // $('#socle-panel-type').change(function(){
  //    if(.val == '') {
  //         $('#result-facade-base-plank').hide();
  //     } else {
  //         $('#result-facade-base-plank').show();
  //     }
  // });
  return calc;
})(jQuery, window);
$(function() {
  $("#meter-in-path").val($("#roof-collection option").first().attr("rel"));
  calc.init();
});
