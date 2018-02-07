// Generated by CoffeeScript 2.0.0-beta4
// Carousel

// 幻燈片
ts.fn.carousel = {
  value: function(parameters) {
    var $allModules, ClassName, EVENT_NAMESPACE, Error, Event, MODULE_NAMESPACE, NAME, Selector, Settings, methodInvoked, query, queryArguments, returnedValue;
    // ------------------------------------------------------------------------
    // 變數與常數設置
    // ------------------------------------------------------------------------

    // 模組名稱。
    NAME = 'carousel';
    // 模組事件鍵名。
    EVENT_NAMESPACE = `.${NAME}`;
    // 模組命名空間。
    MODULE_NAMESPACE = `module-${NAME}`;
    // 模組設定。
    Settings = {
      // 消音所有提示，甚至是錯誤訊息。
      silent: false,
      // 顯示除錯訊息。
      debug: true,
      // 監聽 DOM 結構異動並自動重整快取。
      observeChanges: true,
      // 幻燈片換到下一張的毫秒相隔時間。
      interval: 4000,
      // 是否要自動播放。
      autoplay: true,
      // 當幻燈片變更時所呼叫的函式。
      onChange: function() {},
      // 指示器選項。
      indicator: {
        // 指示器的外觀，`rounded` 為圓角矩形，`circular` 為圓形。
        style: 'rounded',
        // 是否可供轉跳。
        navigable: true,
        // 是否疊加在幻燈片上。
        overlapped: true
      },
      // 控制器選項。
      control: {
        // 控制選項的樣式，`compact` 為較小的按鈕，`full` 為整個側邊區塊
        size: 'compact',
        // 是否疊加在幻燈片上。
        overlapped: true,
        // 圖示選項。
        icon: {
          // 左圖示的圖示名稱。
          left: 'chevron left',
          // 右圖示的圖示名稱
          right: 'chevron right'
        }
      },
      
      metadata: {
        sliding: 'sliding',
        index: 'index',
        content: 'content'
      }
    };
    // 事件名稱。
    Event = {
      CHANGE: `change${EVENT_NAMESPACE}`,
      CLICK: `click${EVENT_NAMESPACE}`
    };
    // 樣式名稱。
    ClassName = {
      COMPACT: 'compact',
      ACTIVE: 'active',
      ITEMS: 'items',
      ITEM: 'item',
      OVERLAPPED: 'overlapped',
      CONTROLS: 'controls',
      NAVIGABLE: 'navigable',
      ROUNDED: 'rounded',
      CIRCULAR: 'circular',
      INDICATORS: 'indicators',
      MOVING: 'moving',
      LEFT: 'left',
      RIGHT: 'right'
    };
    // 選擇器名稱。
    Selector = {
      ITEM: '.item',
      CHILD_ITEM: ':scope > .item',
      CONTROLS_LEFT: '.controls > .left',
      CONTROLS_RIGHT: '.controls > .right',
      ITEMS_ITEM: '.items > .item',
      ACTIVE_ITEM: '.items > .item.active',
      FIRST_ITEM: '.items > .item:first-child',
      LAST_ITEM: '.items > .item:last-child',
      INDICATORS_ITEM: '.indicators > .item'
    };
    // 錯誤訊息。
    Error = {
      METHOD: '欲呼叫的方法並不存在'
    };
    // ------------------------------------------------------------------------
    // 私有變數
    // ------------------------------------------------------------------------
    $allModules = ts(this);
    query = arguments[0];
    queryArguments = [].slice.call(arguments, 1);
    methodInvoked = typeof query === 'string';
    returnedValue = void 0;
    // ------------------------------------------------------------------------
    // 元素遍歷
    // ------------------------------------------------------------------------
    $allModules.each(function() {
      var $this, duration, element, instance, metadata, module, settings;
      // ------------------------------------------------------------------------
      // 區域變數
      // ------------------------------------------------------------------------
      $this = ts(this);
      element = this;
      instance = $this.data(MODULE_NAMESPACE);
      settings = ts.isPlainObject(parameters) ? Object.assign({}, Settings, parameters) : Object.assign({}, Settings);
      duration = 700;
      metadata = Settings.metadata;
      // ------------------------------------------------------------------------
      // 模組定義
      // ------------------------------------------------------------------------
      module = {
        // Play

        // 播放
        play: function() {
          module.debug('播放幻燈片', element);
          if (module.has.timer()) {
            return module.start.timer();
          } else {
            return module.set.timer();
          }
        },
        // Set

        // 設置
        set: {
          timer: function() {
            return $this.setTimer({
              name: 'autoplay',
              callback: module.next,
              interval: 5000,
              looping: true,
              visible: true
            });
          },
          sliding: function(bool) {
            return $this.data(metadata.sliding, bool);
          },
          index: function(index) {
            return $this.data(metadata.index, index);
          },
          content: function(content) {
            return $this.data(metadata.content, content);
          }
        },
        // Get

        // 取得
        get: {
          index: function() {
            return $this.data(metadata.index);
          },
          content: function() {
            return $this.data(metadata.content);
          },
          movingDirection: function(direction) {
            if (direction === 'next') {
              return ClassName.LEFT;
            } else {
              return ClassName.RIGHT;
            }
          },
          direction: function(index, current) {
            if (index > current) {
              return 'next';
            } else {
              return 'previous';
            }
          }
        },
        // Start

        // 開始
        start: {
          timer: function() {
            return $this.playTimer('autoplay');
          }
        },
        // Stop

        // 停止
        stop: {
          timer: function() {
            return $this.pauseTimer('autoplay');
          }
        },
        // Has

        // 是否有
        has: {
          timer: function() {
            return $this.hasTimer('autoplay');
          }
        },
        // Remove

        // 移除
        remove: {
          timer: function() {
            return $this.removeTimer('autoplay');
          }
        },
        // Should

        // 是否應該
        should: {
          autoplay: function() {
            return settings.autoplay;
          }
        },
        // Is

        // 是否
        is: {
          sliding: function() {
            return $this.data(metadata.sliding);
          }
        },
        // Pause

        // 暫停
        pause: function() {
          module.debug('暫停幻燈片', element);
          return module.stop.timer();
        },
        // Slide

        // 往指定方向滑行
        slide: function(direction, $nextElement) {
          var $current, $next, movingDirection;
          module.debug('幻燈片往指定方向切換', direction, $nextElement, element);
          if (module.is.sliding()) {
            return;
          }
          module.set.sliding(true);
          movingDirection = module.get.movingDirection(direction);
          $current = $this.find(Selector.ACTIVE_ITEM);
          switch (false) {
            case $nextElement === void 0:
              $next = $nextElement;
              break;
            case direction !== 'next':
              $next = $current.next();
              $next = $next.length === 0 ? $this.find(Selector.FIRST_ITEM) : $next;
              break;
            default:
              $next = $current.prev();
              $next = $next.length === 0 ? $this.find(Selector.LAST_ITEM) : $next;
          }
          $this.find(Selector.INDICATORS_ITEM).removeClass(ClassName.ACTIVE).eq($next.index()).addClass(ClassName.ACTIVE);
          $next.addClass(direction).reflow();
          $current.addClass(`${ClassName.MOVING} ${movingDirection}`);
          $next.addClass(`${ClassName.MOVING} ${movingDirection}`);
          module.set.index($next.index());
          $this.trigger(Event.CHANGE, element, module.get.index());
          return $current.one('transitionend', () => {
            $next.removeClass(`${ClassName.MOVING} ${movingDirection} ${direction}`).addClass(ClassName.ACTIVE);
            $current.removeClass(`${ClassName.ACTIVE} ${ClassName.MOVING} ${movingDirection} ${direction}`);
            return module.set.sliding(false);
          }).emulate('transitionend', duration);
        },
        // Slide To

        // 滑到指定幻燈片
        slideTo: function(index) {
          var $eqItem, current;
          module.debug('滑到指定幻燈片索引', index, element);
          $eqItem = $this.find(Selector.ITEMS_ITEM).eq(index);
          current = module.get.index();
          if ($eqItem.length === 0 || current === index) {
            return;
          }
          return module.slide(module.get.direction(index, current), $eqItem);
        },
        // Next

        // 下一張
        next: function() {
          module.debug('下一張幻燈片', element);
          return module.slide('next');
        },
        // Previous

        // 上一張
        previous: function() {
          module.debug('上一張幻燈片', element);
          return module.slide('previous');
        },
        // Templates

        // 模板
        templates: {
          // Controls

          // 控制按鈕
          controls: function() {
            return `<a href=\"#!\" class=\"left\"><i class=\"${settings.control.icon.left} icon\"></i></a>\n<a href=\"#!\" class=\"right\"><i class=\"${settings.control.icon.right} icon\"></i></a>`;
          }
        },
        // Bind

        // 綁定
        bind: {
          // Events

          // 事件
          events: () => {
            var ref;
            module.debug('綁定事件', element);
            if (settings.control) {
              module.bind.controlEvents();
            }
            if ((ref = settings.indicator) != null ? ref.navigable : void 0) {
              module.bind.indicatorEvents();
            }
            return $this.on(Event.CHANGE, function(event, context, index) {
              return settings.onChange.call(context, event, index);
            });
          },
          // Control Events

          // 控制按鈕事件
          controlEvents: () => {
            module.debug('綁定控制按鈕事件', element);
            $this.on(Event.CLICK, Selector.CONTROLS_LEFT, () => {
              return module.previous();
            });
            return $this.on(Event.CLICK, Selector.CONTROLS_RIGHT, () => {
              return module.next();
            });
          },
          // Indicator Events

          // 指示器事件
          indicatorEvents: () => {
            module.debug('綁定指示器事件', element);
            return $this.find(Selector.INDICATORS_ITEM).each((element, index) => {
              return ts(element).on(Event.CLICK, () => {
                return module.slideTo(index);
              });
            });
          }
        },
        // ------------------------------------------------------------------------
        // 模組核心
        // ------------------------------------------------------------------------

        // Initialize

        // 初始化
        initialize: function() {
          var $children, $control, $indicator, $indicators, $items, i, index, ref;
          module.debug('初始化幻燈片', element);
          module.set.content($this.html());
          $items = ts('<div>').addClass(ClassName.ITEMS);
          $children = $this.find(Selector.CHILD_ITEM);
          $children.eq(0).addClass(ClassName.ACTIVE);
          $items.append($children);
          $this.html('');
          if (settings.control) {
            $control = ts('<div>').html(module.templates.controls()).addClass(ClassName.CONTROLS).addClass({
              [`${ClassName.OVERLAPPED}`]: settings.control.overlapped,
              [`${ClassName.COMPACT}`]: settings.control.style === ClassName.COMPACT
            });
            $this.append($control);
          }
          $this.append($items);
          if (settings.indicator) {
            $indicators = ts('<div>').addClass(ClassName.INDICATORS).addClass({
              [`${ClassName.OVERLAPPED}`]: settings.indicator.overlapped,
              [`${ClassName.NAVIGABLE}`]: settings.indicator.navigable,
              [`${ClassName.CIRCULAR}`]: settings.indicator.style !== ClassName.ROUNDED
            });
            for (index = i = 1, ref = $children.length; 1 <= ref ? i <= ref : i >= ref; index = 1 <= ref ? ++i : --i) {
              $indicator = ts('<div>').addClass(ClassName.ITEM).addClass({
                [`${ClassName.ACTIVE}`]: index === 1
              });
              $indicators.append($indicator);
            }
            $this.append($indicators);
          }
          module.set.index(0);
          module.bind.events();
          if (module.should.autoplay()) {
            module.play();
          }
          if (settings.observeChanges) {
            module.observeChanges();
          }
          return module.instantiate();
        },
        // Instantiate

        // 實例化
        instantiate: function() {
          module.debug('實例化幻燈片', element);
          instance = module;
          return $this.data(MODULE_NAMESPACE, instance);
        },
        // Observe Changes

        // 結構異動觀察者
        observeChanges: function() {
          var observer;
          if (!'MutationObserver' in window) {
            module.debug('找不到樹狀結構變更觀測者，略過結構監聽動作', element);
            return;
          }
          observer = new MutationObserver(function(mutations) {
            module.debug('DOM 樹狀結構已變更，更新快取資料');
            return module.refresh();
          });
          observer.observe(element, {
            childList: true,
            subtree: true
          });
          return module.debug('已設置 DOM 樹狀結構異動觀察者', observer);
        },
        // Refresh

        // 更新資料
        refresh: function() {
          var $content, $title;
          $title = $this.find(Selector.TITLE);
          return $content = $this.find(Selector.CONTENT);
        },
        // Destroy

        // 摧毀
        destroy: function() {
          module.debug('摧毀幻燈片', element);
          // 移除所有計時器。
          module.remove.timer();
          // 重生幻燈片原本的 HTML 內容。
          return $this.html(module.get.content()).removeData(MODULE_NAMESPACE).off(EVENT_NAMESPACE);
        },
        // Invoke

        // 模組呼叫點
        invoke: function(query, passedArguments, context) {
          var camelCaseValue, depth, found, i, len, maxDepth, object, response, value;
          object = instance;
          maxDepth = void 0;
          found = void 0;
          response = void 0;
          passedArguments = passedArguments || queryArguments;
          context = element || context;
          // 如果語法是字串，本地區域也有被定義的話。
          if (typeof query === 'string' && object !== void 0) {
            // 將語法以空白分隔。
            query = query.split(/[\. ]/);
            // 取得此語法的深度。
            maxDepth = query.length - 1;
            // 解析語法的每個片段。
            for (depth = i = 0, len = query.length; i < len; depth = ++i) {
              value = query[depth];
              // 將語法轉換成駝峰式大小寫，用以對應本地模組的函式名稱。
              camelCaseValue = depth !== maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              // 如果此駝峰是大小寫有對應到模組中的物件，而且語法還未到底，那麼就依照此物件遞迴搜尋。
              if (ts.isPlainObject(object[camelCaseValue]) && depth !== maxDepth) {
                object = object[camelCaseValue];
              // 如果語法駝峰式大小寫有對應到模組的一個函式，則使用該函式。
              } else if (object[camelCaseValue] !== void 0) {
                found = object[camelCaseValue];
                break;
              // 如果語法有對應到模組中的物件，而且語法還未到底，那麼就依照此物件遞迴搜尋。
              } else if (ts.isPlainObject(object[value]) && depth !== maxDepth) {
                object = object[value];
              // 如果語法有對應一個函式，則使用該函式。
              } else if (object[value] !== void 0) {
                found = object[value];
                break;
              } else {
                // 如果語法沒有對應到任何東西則表示錯誤。
                module.error(Error.METHOD, query);
                break;
              }
            }
          }
          switch (false) {
            // 當找到的對應物件是個函式，就呼叫該函式並取得其結果。
            // 決定回應的結果。
            case typeof found !== 'function':
              response = found.apply(context, passedArguments);
              break;
            // 當找到的物件不是函式，就當其為結果。
            case found === void 0:
              response = found;
          }
          switch (false) {
            // 當回傳的值是一個陣列，就將回應結果推入回傳值陣列中。
            // 決定如何處置欲回傳的值。
            case !Array.isArray(returnedValue):
              returnedValue.push(response);
              break;
            // 如果回傳的值不是陣列，則建立一個陣列並包含自己和回應結果。
            case returnedValue === void 0:
              returnedValue = [returnedValue, response];
              break;
            // 當有回應時，就將回傳值設為其回應結果。
            case response === void 0:
              returnedValue = response;
          }
          // 回傳找到的物件。
          return found;
        },
        // Debug

        // 除錯訊息
        debug: function() {
          if (!settings.debug || settings.silent) {
            return;
          }
          module.debug = Function.prototype.bind.call(console.info, console, `${NAME}:`);
          return module.debug.apply(console, arguments);
        },
        // Error

        // 錯誤訊息
        error: function() {
          if (settings.silent) {
            return;
          }
          module.error = Function.prototype.bind.call(console.error, console, `${NAME}:`);
          return module.error.apply(console, arguments);
        }
      };
      // ------------------------------------------------------------------------
      // Tocas 核心安插
      // ------------------------------------------------------------------------
      if (methodInvoked) {
        if (instance === void 0) {
          module.initialize();
        }
        return module.invoke(query);
      } else {
        if (instance !== void 0) {
          instance.invoke('destroy');
        }
        return module.initialize();
      }
    });
    if (returnedValue !== void 0) {
      return returnedValue;
    } else {
      return ts;
    }
  }
};
