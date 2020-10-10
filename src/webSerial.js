'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
// Object.defineProperty(exports, '__esModule', { value: true });
var WebSerial = /** @class */ (function() {
  function WebSerial(send_chunk, send_interval) {
    if (send_chunk === void 0) {
      send_chunk = 64;
    }
    if (send_interval === void 0) {
      send_interval = 30;
    }
    this.send_chunk = send_chunk;
    this.send_interval = send_interval;
    this.receiveCallback = null;
    this.closeCallback = null;
    this.errorCallback = null;
    this.port = null;
    this.writable = null;
    this.reader = null;
    this._connected = false;
  }
  Object.defineProperty(WebSerial.prototype, 'connected', {
    get: function() {
      return this._connected;
    },
    enumerable: true,
    configurable: true
  });
  WebSerial.prototype.setReceiveCallback = function(recvHandler) {
    this.receiveCallback = recvHandler;
  };
  WebSerial.prototype.setErrorCallback = function(handler) {
    this.errorCallback = handler;
  };
  WebSerial.prototype.setCloseCallback = function(handler) {
    this.errorCallback = handler;
  };
  WebSerial.prototype.open = function(onConnect) {
    return __awaiter(this, void 0, void 0, function() {
      var _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _a = this;
            return [4 /*yield*/, navigator.serial.requestPort()];
          case 1:
            _a.port = _b.sent();
            return [
              4 /*yield*/,
              this.port.open({ baudRate: 115200, buffersize: 81920 })
            ];
          case 2:
            _b.sent();
            this._connected = true;
            if (onConnect) {
              onConnect();
            }
            this.readLoop();
            this.writable = this.port.writable;
            return [2 /*return*/];
        }
      });
    });
  };
  WebSerial.prototype.readLoop = function() {
    return __awaiter(this, void 0, void 0, function() {
      var _a, done, value, e_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            if (this.port == null) {
              console.error('failed to read from serial port');
              return [2 /*return*/];
            }
            _b.label = 1;
          case 1:
            _b.trys.push([1, 6, , 8]);
            this.reader = this.port.readable.getReader();
            console.log('start read loop');
            _b.label = 2;
          case 2:
            return [4 /*yield*/, this.reader.read()];
          case 3:
            (_a = _b.sent()), (done = _a.done), (value = _a.value);
            if (value) {
              console.log(`serial received: ${value.length} bytes`);
              if (this.receiveCallback) {
                this.receiveCallback(value);
              }
            }
            if (done) {
              console.log('Web serial read complete', done);
              if (this.reader) {
                this.reader.releaseLock();
              }
              return [3 /*break*/, 5];
            }
            _b.label = 4;
          case 4:
            return [3 /*break*/, 2];
          case 5:
            return [3 /*break*/, 8];
          case 6:
            e_1 = _b.sent();
            console.error(e_1);
            if (this.errorCallback) {
              this.errorCallback(e_1);
            }
            return [4 /*yield*/, this.close()];
          case 7:
            _b.sent();
            return [3 /*break*/, 8];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  WebSerial.prototype.sleep = function(ms) {
    return new Promise(function(resolve) {
      return setTimeout(resolve, ms);
    });
  };
  WebSerial.prototype.write = function(msg) {
    return __awaiter(this, void 0, void 0, function() {
      var writer, index;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (this.writable == null) {
              return [2 /*return*/];
            }
            writer = this.writable.getWriter();
            index = 0;
            _a.label = 1;
          case 1:
            if (!(index < msg.length)) return [3 /*break*/, 5];
            // console.log("serial send:", msg.slice(index, index + this.send_chunk));
            return [
              4 /*yield*/,
              writer.write(msg.slice(index, index + this.send_chunk))
            ];
          case 2:
            // console.log("serial send:", msg.slice(index, index + this.send_chunk));
            _a.sent();
            return [4 /*yield*/, this.sleep(this.send_interval)];
          case 3:
            _a.sent();
            _a.label = 4;
          case 4:
            index += this.send_chunk;
            return [3 /*break*/, 1];
          case 5:
            writer.releaseLock();
            return [2 /*return*/];
        }
      });
    });
  };
  WebSerial.prototype.close = function() {
    return __awaiter(this, void 0, void 0, function() {
      var e_2, e_3;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            this._connected = false;
            if (!this.reader) return [3 /*break*/, 5];
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, this.reader.cancel()];
          case 2:
            _a.sent();
            this.reader.releaseLock();
            return [3 /*break*/, 5];
          case 3:
            e_2 = _a.sent();
            console.error(e_2);
            return [3 /*break*/, 5];
          case 4:
            this.reader = null;
            return [7 /*endfinally*/];
          case 5:
            if (this.writable) {
              // this.writable.abort();
              this.writable = null;
            }
            if (this.closeCallback) {
              this.closeCallback();
            }
            if (!this.port) return [3 /*break*/, 9];
            _a.label = 6;
          case 6:
            _a.trys.push([6, 8, , 9]);
            return [4 /*yield*/, this.port.close()];
          case 7:
            _a.sent();
            this.port = null;
            return [3 /*break*/, 9];
          case 8:
            e_3 = _a.sent();
            console.error(e_3);
            return [3 /*break*/, 9];
          case 9:
            console.log('serial port closed');
            return [2 /*return*/];
        }
      });
    });
  };
  return WebSerial;
})();
// exports.WebSerial = WebSerial;

export { WebSerial };
