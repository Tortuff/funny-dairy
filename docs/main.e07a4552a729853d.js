'use strict'
;(self.webpackChunkfunny_dairy = self.webpackChunkfunny_dairy || []).push([
  [179],
  {
    335: () => {
      function X(e) {
        return 'function' == typeof e
      }
      function Br(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack)
        })
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        )
      }
      const Yi = Br(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = n)
          }
      )
      function Hr(e, t) {
        if (e) {
          const n = e.indexOf(t)
          0 <= n && e.splice(n, 1)
        }
      }
      class tt {
        constructor(t) {
          ;(this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null)
        }
        unsubscribe() {
          let t
          if (!this.closed) {
            this.closed = !0
            const { _parentage: n } = this
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const o of n) o.remove(this)
              else n.remove(this)
            const { initialTeardown: r } = this
            if (X(r))
              try {
                r()
              } catch (o) {
                t = o instanceof Yi ? o.errors : [o]
              }
            const { _finalizers: i } = this
            if (i) {
              this._finalizers = null
              for (const o of i)
                try {
                  Nc(o)
                } catch (s) {
                  ;(t = null != t ? t : []),
                    s instanceof Yi ? (t = [...t, ...s.errors]) : t.push(s)
                }
            }
            if (t) throw new Yi(t)
          }
        }
        add(t) {
          var n
          if (t && t !== this)
            if (this.closed) Nc(t)
            else {
              if (t instanceof tt) {
                if (t.closed || t._hasParent(this)) return
                t._addParent(this)
              }
              ;(this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              )
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this
          return n === t || (Array.isArray(n) && n.includes(t))
        }
        _addParent(t) {
          const { _parentage: n } = this
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
        }
        _removeParent(t) {
          const { _parentage: n } = this
          n === t ? (this._parentage = null) : Array.isArray(n) && Hr(n, t)
        }
        remove(t) {
          const { _finalizers: n } = this
          n && Hr(n, t), t instanceof tt && t._removeParent(this)
        }
      }
      tt.EMPTY = (() => {
        const e = new tt()
        return (e.closed = !0), e
      })()
      const Pc = tt.EMPTY
      function Oc(e) {
        return (
          e instanceof tt ||
          (e && 'closed' in e && X(e.remove) && X(e.add) && X(e.unsubscribe))
        )
      }
      function Nc(e) {
        X(e) ? e() : e.unsubscribe()
      }
      const En = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Ki = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Ki
            return (null == r ? void 0 : r.setTimeout)
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n)
          },
          clearTimeout(e) {
            const { delegate: t } = Ki
            return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e)
          },
          delegate: void 0,
        }
      function Fc(e) {
        Ki.setTimeout(() => {
          const { onUnhandledError: t } = En
          if (!t) throw e
          t(e)
        })
      }
      function kc() {}
      const Sv = Vs('C', void 0, void 0)
      function Vs(e, t, n) {
        return { kind: e, value: t, error: n }
      }
      let bn = null
      function Ji(e) {
        if (En.useDeprecatedSynchronousErrorHandling) {
          const t = !bn
          if ((t && (bn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = bn
            if (((bn = null), n)) throw r
          }
        } else e()
      }
      class Bs extends tt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Oc(t) && t.add(this))
              : (this.destination = Nv)
        }
        static create(t, n, r) {
          return new Ur(t, n, r)
        }
        next(t) {
          this.isStopped
            ? Us(
                (function Av(e) {
                  return Vs('N', e, void 0)
                })(t),
                this
              )
            : this._next(t)
        }
        error(t) {
          this.isStopped
            ? Us(
                (function Tv(e) {
                  return Vs('E', void 0, e)
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t))
        }
        complete() {
          this.isStopped
            ? Us(Sv, this)
            : ((this.isStopped = !0), this._complete())
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null))
        }
        _next(t) {
          this.destination.next(t)
        }
        _error(t) {
          try {
            this.destination.error(t)
          } finally {
            this.unsubscribe()
          }
        }
        _complete() {
          try {
            this.destination.complete()
          } finally {
            this.unsubscribe()
          }
        }
      }
      const Rv = Function.prototype.bind
      function Hs(e, t) {
        return Rv.call(e, t)
      }
      class Pv {
        constructor(t) {
          this.partialObserver = t
        }
        next(t) {
          const { partialObserver: n } = this
          if (n.next)
            try {
              n.next(t)
            } catch (r) {
              Xi(r)
            }
        }
        error(t) {
          const { partialObserver: n } = this
          if (n.error)
            try {
              n.error(t)
            } catch (r) {
              Xi(r)
            }
          else Xi(t)
        }
        complete() {
          const { partialObserver: t } = this
          if (t.complete)
            try {
              t.complete()
            } catch (n) {
              Xi(n)
            }
        }
      }
      class Ur extends Bs {
        constructor(t, n, r) {
          let i
          if ((super(), X(t) || !t))
            i = {
              next: null != t ? t : void 0,
              error: null != n ? n : void 0,
              complete: null != r ? r : void 0,
            }
          else {
            let o
            this && En.useDeprecatedNextContext
              ? ((o = Object.create(t)),
                (o.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: t.next && Hs(t.next, o),
                  error: t.error && Hs(t.error, o),
                  complete: t.complete && Hs(t.complete, o),
                }))
              : (i = t)
          }
          this.destination = new Pv(i)
        }
      }
      function Xi(e) {
        En.useDeprecatedSynchronousErrorHandling
          ? (function xv(e) {
              En.useDeprecatedSynchronousErrorHandling &&
                bn &&
                ((bn.errorThrown = !0), (bn.error = e))
            })(e)
          : Fc(e)
      }
      function Us(e, t) {
        const { onStoppedNotification: n } = En
        n && Ki.setTimeout(() => n(e, t))
      }
      const Nv = {
          closed: !0,
          next: kc,
          error: function Ov(e) {
            throw e
          },
          complete: kc,
        },
        $s =
          ('function' == typeof Symbol && Symbol.observable) || '@@observable'
      function Mn(e) {
        return e
      }
      let ye = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n)
          }
          lift(n) {
            const r = new e()
            return (r.source = this), (r.operator = n), r
          }
          subscribe(n, r, i) {
            const o = (function kv(e) {
              return (
                (e && e instanceof Bs) ||
                ((function Fv(e) {
                  return e && X(e.next) && X(e.error) && X(e.complete)
                })(e) &&
                  Oc(e))
              )
            })(n)
              ? n
              : new Ur(n, r, i)
            return (
              Ji(() => {
                const { operator: s, source: a } = this
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                )
              }),
              o
            )
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n)
            } catch (r) {
              n.error(r)
            }
          }
          forEach(n, r) {
            return new (r = jc(r))((i, o) => {
              const s = new Ur({
                next: (a) => {
                  try {
                    n(a)
                  } catch (u) {
                    o(u), s.unsubscribe()
                  }
                },
                error: o,
                complete: i,
              })
              this.subscribe(s)
            })
          }
          _subscribe(n) {
            var r
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n)
          }
          [$s]() {
            return this
          }
          pipe(...n) {
            return (function Lc(e) {
              return 0 === e.length
                ? Mn
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, i) => i(r), n)
                  }
            })(n)(this)
          }
          toPromise(n) {
            return new (n = jc(n))((r, i) => {
              let o
              this.subscribe(
                (s) => (o = s),
                (s) => i(s),
                () => r(o)
              )
            })
          }
        }
        return (e.create = (t) => new e(t)), e
      })()
      function jc(e) {
        var t
        return null !== (t = null != e ? e : En.Promise) && void 0 !== t
          ? t
          : Promise
      }
      const Lv = Br(
        (e) =>
          function () {
            e(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed')
          }
      )
      let Ht = (() => {
        class e extends ye {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null)
          }
          lift(n) {
            const r = new Vc(this, this)
            return (r.operator = n), r
          }
          _throwIfClosed() {
            if (this.closed) throw new Lv()
          }
          next(n) {
            Ji(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers))
                for (const r of this.currentObservers) r.next(n)
              }
            })
          }
          error(n) {
            Ji(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                ;(this.hasError = this.isStopped = !0), (this.thrownError = n)
                const { observers: r } = this
                for (; r.length; ) r.shift().error(n)
              }
            })
          }
          complete() {
            Ji(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0
                const { observers: n } = this
                for (; n.length; ) n.shift().complete()
              }
            })
          }
          unsubscribe() {
            ;(this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null)
          }
          get observed() {
            var n
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            )
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n)
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            )
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: i, observers: o } = this
            return r || i
              ? Pc
              : ((this.currentObservers = null),
                o.push(n),
                new tt(() => {
                  ;(this.currentObservers = null), Hr(o, n)
                }))
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: i, isStopped: o } = this
            r ? n.error(i) : o && n.complete()
          }
          asObservable() {
            const n = new ye()
            return (n.source = this), n
          }
        }
        return (e.create = (t, n) => new Vc(t, n)), e
      })()
      class Vc extends Ht {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n)
        }
        next(t) {
          var n, r
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t)
        }
        error(t) {
          var n, r
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t)
        }
        complete() {
          var t, n
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t)
        }
        _subscribe(t) {
          var n, r
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Pc
        }
      }
      function Bc(e) {
        return X(null == e ? void 0 : e.lift)
      }
      function be(e) {
        return (t) => {
          if (Bc(t))
            return t.lift(function (n) {
              try {
                return e(n, this)
              } catch (r) {
                this.error(r)
              }
            })
          throw new TypeError('Unable to lift unknown Observable type')
        }
      }
      function Me(e, t, n, r, i) {
        return new jv(e, t, n, r, i)
      }
      class jv extends Bs {
        constructor(t, n, r, i, o, s) {
          super(t),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a)
                  } catch (u) {
                    t.error(u)
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a)
                  } catch (u) {
                    t.error(u)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r()
                  } catch (a) {
                    t.error(a)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._complete)
        }
        unsubscribe() {
          var t
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) || void 0 === t || t.call(this))
          }
        }
      }
      function ne(e, t) {
        return be((n, r) => {
          let i = 0
          n.subscribe(
            Me(r, (o) => {
              r.next(e.call(t, o, i++))
            })
          )
        })
      }
      function In(e) {
        return this instanceof In ? ((this.v = e), this) : new In(e)
      }
      function Hv(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.')
        var i,
          r = n.apply(e, t || []),
          o = []
        return (
          (i = {}),
          s('next'),
          s('throw'),
          s('return'),
          (i[Symbol.asyncIterator] = function () {
            return this
          }),
          i
        )
        function s(f) {
          r[f] &&
            (i[f] = function (h) {
              return new Promise(function (p, m) {
                o.push([f, h, p, m]) > 1 || a(f, h)
              })
            })
        }
        function a(f, h) {
          try {
            !(function u(f) {
              f.value instanceof In
                ? Promise.resolve(f.value.v).then(l, c)
                : d(o[0][2], f)
            })(r[f](h))
          } catch (p) {
            d(o[0][3], p)
          }
        }
        function l(f) {
          a('next', f)
        }
        function c(f) {
          a('throw', f)
        }
        function d(f, h) {
          f(h), o.shift(), o.length && a(o[0][0], o[0][1])
        }
      }
      function Uv(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.')
        var n,
          t = e[Symbol.asyncIterator]
        return t
          ? t.call(e)
          : ((e = (function $c(e) {
              var t = 'function' == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0
              if (n) return n.call(e)
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    )
                  },
                }
              throw new TypeError(
                t
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.'
              )
            })(e)),
            (n = {}),
            r('next'),
            r('throw'),
            r('return'),
            (n[Symbol.asyncIterator] = function () {
              return this
            }),
            n)
        function r(o) {
          n[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function i(o, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    o({ value: l, done: a })
                  }, s)
                })(a, u, (s = e[o](s)).done, s.value)
              })
            }
        }
      }
      const zc = (e) =>
        e && 'number' == typeof e.length && 'function' != typeof e
      function Gc(e) {
        return X(null == e ? void 0 : e.then)
      }
      function qc(e) {
        return X(e[$s])
      }
      function Wc(e) {
        return (
          Symbol.asyncIterator &&
          X(null == e ? void 0 : e[Symbol.asyncIterator])
        )
      }
      function Zc(e) {
        return new TypeError(
          `You provided ${
            null !== e && 'object' == typeof e ? 'an invalid object' : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        )
      }
      const Qc = (function zv() {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator'
      })()
      function Yc(e) {
        return X(null == e ? void 0 : e[Qc])
      }
      function Kc(e) {
        return Hv(this, arguments, function* () {
          const n = e.getReader()
          try {
            for (;;) {
              const { value: r, done: i } = yield In(n.read())
              if (i) return yield In(void 0)
              yield yield In(r)
            }
          } finally {
            n.releaseLock()
          }
        })
      }
      function Jc(e) {
        return X(null == e ? void 0 : e.getReader)
      }
      function It(e) {
        if (e instanceof ye) return e
        if (null != e) {
          if (qc(e))
            return (function Gv(e) {
              return new ye((t) => {
                const n = e[$s]()
                if (X(n.subscribe)) return n.subscribe(t)
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                )
              })
            })(e)
          if (zc(e))
            return (function qv(e) {
              return new ye((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n])
                t.complete()
              })
            })(e)
          if (Gc(e))
            return (function Wv(e) {
              return new ye((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete())
                  },
                  (n) => t.error(n)
                ).then(null, Fc)
              })
            })(e)
          if (Wc(e)) return Xc(e)
          if (Yc(e))
            return (function Zv(e) {
              return new ye((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return
                t.complete()
              })
            })(e)
          if (Jc(e))
            return (function Qv(e) {
              return Xc(Kc(e))
            })(e)
        }
        throw Zc(e)
      }
      function Xc(e) {
        return new ye((t) => {
          ;(function Yv(e, t) {
            var n, r, i, o
            return (function Vv(e, t, n, r) {
              return new (n || (n = Promise))(function (o, s) {
                function a(c) {
                  try {
                    l(r.next(c))
                  } catch (d) {
                    s(d)
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c))
                  } catch (d) {
                    s(d)
                  }
                }
                function l(c) {
                  c.done
                    ? o(c.value)
                    : (function i(o) {
                        return o instanceof n
                          ? o
                          : new n(function (s) {
                              s(o)
                            })
                      })(c.value).then(a, u)
                }
                l((r = r.apply(e, t || [])).next())
              })
            })(this, void 0, void 0, function* () {
              try {
                for (n = Uv(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return
              } catch (s) {
                i = { error: s }
              } finally {
                try {
                  r && !r.done && (o = n.return) && (yield o.call(n))
                } finally {
                  if (i) throw i.error
                }
              }
              t.complete()
            })
          })(e, t).catch((n) => t.error(n))
        })
      }
      function Ut(e, t, n, r = 0, i = !1) {
        const o = t.schedule(function () {
          n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe()
        }, r)
        if ((e.add(o), !i)) return o
      }
      function we(e, t, n = 1 / 0) {
        return X(t)
          ? we((r, i) => ne((o, s) => t(r, o, i, s))(It(e(r, i))), n)
          : ('number' == typeof t && (n = t),
            be((r, i) =>
              (function Kv(e, t, n, r, i, o, s, a) {
                const u = []
                let l = 0,
                  c = 0,
                  d = !1
                const f = () => {
                    d && !u.length && !l && t.complete()
                  },
                  h = (m) => (l < r ? p(m) : u.push(m)),
                  p = (m) => {
                    o && t.next(m), l++
                    let v = !1
                    It(n(m, c++)).subscribe(
                      Me(
                        t,
                        (D) => {
                          null == i || i(D), o ? h(D) : t.next(D)
                        },
                        () => {
                          v = !0
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (l--; u.length && l < r; ) {
                                const D = u.shift()
                                s ? Ut(t, s, () => p(D)) : p(D)
                              }
                              f()
                            } catch (D) {
                              t.error(D)
                            }
                        }
                      )
                    )
                  }
                return (
                  e.subscribe(
                    Me(t, h, () => {
                      ;(d = !0), f()
                    })
                  ),
                  () => {
                    null == a || a()
                  }
                )
              })(r, i, e, n)
            ))
      }
      function $r(e = 1 / 0) {
        return we(Mn, e)
      }
      const $t = new ye((e) => e.complete())
      function Gs(e) {
        return e[e.length - 1]
      }
      function zr(e) {
        return (function Xv(e) {
          return e && X(e.schedule)
        })(Gs(e))
          ? e.pop()
          : void 0
      }
      function ed(e, t = 0) {
        return be((n, r) => {
          n.subscribe(
            Me(
              r,
              (i) => Ut(r, e, () => r.next(i), t),
              () => Ut(r, e, () => r.complete(), t),
              (i) => Ut(r, e, () => r.error(i), t)
            )
          )
        })
      }
      function td(e, t = 0) {
        return be((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t))
        })
      }
      function nd(e, t) {
        if (!e) throw new Error('Iterable cannot be null')
        return new ye((n) => {
          Ut(n, t, () => {
            const r = e[Symbol.asyncIterator]()
            Ut(
              n,
              t,
              () => {
                r.next().then((i) => {
                  i.done ? n.complete() : n.next(i.value)
                })
              },
              0,
              !0
            )
          })
        })
      }
      function Te(e, t) {
        return t
          ? (function u0(e, t) {
              if (null != e) {
                if (qc(e))
                  return (function n0(e, t) {
                    return It(e).pipe(td(t), ed(t))
                  })(e, t)
                if (zc(e))
                  return (function o0(e, t) {
                    return new ye((n) => {
                      let r = 0
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule())
                      })
                    })
                  })(e, t)
                if (Gc(e))
                  return (function r0(e, t) {
                    return It(e).pipe(td(t), ed(t))
                  })(e, t)
                if (Wc(e)) return nd(e, t)
                if (Yc(e))
                  return (function s0(e, t) {
                    return new ye((n) => {
                      let r
                      return (
                        Ut(n, t, () => {
                          ;(r = e[Qc]()),
                            Ut(
                              n,
                              t,
                              () => {
                                let i, o
                                try {
                                  ;({ value: i, done: o } = r.next())
                                } catch (s) {
                                  return void n.error(s)
                                }
                                o ? n.complete() : n.next(i)
                              },
                              0,
                              !0
                            )
                        }),
                        () => X(null == r ? void 0 : r.return) && r.return()
                      )
                    })
                  })(e, t)
                if (Jc(e))
                  return (function a0(e, t) {
                    return nd(Kc(e), t)
                  })(e, t)
              }
              throw Zc(e)
            })(e, t)
          : It(e)
      }
      function qs(e, t, ...n) {
        if (!0 === t) return void e()
        if (!1 === t) return
        const r = new Ur({
          next: () => {
            r.unsubscribe(), e()
          },
        })
        return t(...n).subscribe(r)
      }
      function K(e) {
        for (let t in e) if (e[t] === K) return t
        throw Error('Could not find renamed property on target object.')
      }
      function Q(e) {
        if ('string' == typeof e) return e
        if (Array.isArray(e)) return '[' + e.map(Q).join(', ') + ']'
        if (null == e) return '' + e
        if (e.overriddenName) return `${e.overriddenName}`
        if (e.name) return `${e.name}`
        const t = e.toString()
        if (null == t) return '' + t
        const n = t.indexOf('\n')
        return -1 === n ? t : t.substring(0, n)
      }
      function Zs(e, t) {
        return null == e || '' === e
          ? null === t
            ? ''
            : t
          : null == t || '' === t
          ? e
          : e + ' ' + t
      }
      const d0 = K({ __forward_ref__: K })
      function Qs(e) {
        return (
          (e.__forward_ref__ = Qs),
          (e.toString = function () {
            return Q(this())
          }),
          e
        )
      }
      function O(e) {
        return (function rd(e) {
          return (
            'function' == typeof e &&
            e.hasOwnProperty(d0) &&
            e.__forward_ref__ === Qs
          )
        })(e)
          ? e()
          : e
      }
      class Z extends Error {
        constructor(t, n) {
          super(
            (function Ys(e, t) {
              return `NG0${Math.abs(e)}${t ? ': ' + t : ''}`
            })(t, n)
          ),
            (this.code = t)
        }
      }
      function R(e) {
        return 'string' == typeof e ? e : null == e ? '' : String(e)
      }
      function Ne(e) {
        return 'function' == typeof e
          ? e.name || e.toString()
          : 'object' == typeof e && null != e && 'function' == typeof e.type
          ? e.type.name || e.type.toString()
          : R(e)
      }
      function eo(e, t) {
        const n = t ? ` in ${t}` : ''
        throw new Z(-201, `No provider for ${Ne(e)} found${n}`)
      }
      function qe(e, t) {
        null == e &&
          (function re(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? '' : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            )
          })(t, e, null, '!=')
      }
      function $(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        }
      }
      function St(e) {
        return { providers: e.providers || [], imports: e.imports || [] }
      }
      function Ks(e) {
        return id(e, to) || id(e, sd)
      }
      function id(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null
      }
      function od(e) {
        return e && (e.hasOwnProperty(Js) || e.hasOwnProperty(v0))
          ? e[Js]
          : null
      }
      const to = K({ ɵprov: K }),
        Js = K({ ɵinj: K }),
        sd = K({ ngInjectableDef: K }),
        v0 = K({ ngInjectorDef: K })
      var x = (() => (
        ((x = x || {})[(x.Default = 0)] = 'Default'),
        (x[(x.Host = 1)] = 'Host'),
        (x[(x.Self = 2)] = 'Self'),
        (x[(x.SkipSelf = 4)] = 'SkipSelf'),
        (x[(x.Optional = 8)] = 'Optional'),
        x
      ))()
      let Xs
      function rn(e) {
        const t = Xs
        return (Xs = e), t
      }
      function ad(e, t, n) {
        const r = Ks(e)
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & x.Optional
          ? null
          : void 0 !== t
          ? t
          : void eo(Q(e), 'Injector')
      }
      function on(e) {
        return { toString: e }.toString()
      }
      var ft = (() => (
          ((ft = ft || {})[(ft.OnPush = 0)] = 'OnPush'),
          (ft[(ft.Default = 1)] = 'Default'),
          ft
        ))(),
        Tt = (() => {
          return (
            ((e = Tt || (Tt = {}))[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            Tt
          )
          var e
        })()
      const _0 = 'undefined' != typeof globalThis && globalThis,
        C0 = 'undefined' != typeof window && window,
        w0 =
          'undefined' != typeof self &&
          'undefined' != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Y = _0 || ('undefined' != typeof global && global) || C0 || w0,
        qn = {},
        J = [],
        no = K({ ɵcmp: K }),
        ea = K({ ɵdir: K }),
        ta = K({ ɵpipe: K }),
        ud = K({ ɵmod: K }),
        Gt = K({ ɵfac: K }),
        Gr = K({ __NG_ELEMENT_ID__: K })
      let E0 = 0
      function qr(e) {
        return on(() => {
          const n = {},
            r = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: n,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === ft.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: e.selectors || J,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || Tt.Emulated,
              id: 'c',
              styles: e.styles || J,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            i = e.directives,
            o = e.features,
            s = e.pipes
          return (
            (r.id += E0++),
            (r.inputs = fd(e.inputs, n)),
            (r.outputs = fd(e.outputs)),
            o && o.forEach((a) => a(r)),
            (r.directiveDefs = i
              ? () => ('function' == typeof i ? i() : i).map(ld)
              : null),
            (r.pipeDefs = s
              ? () => ('function' == typeof s ? s() : s).map(cd)
              : null),
            r
          )
        })
      }
      function ld(e) {
        return (
          xe(e) ||
          (function sn(e) {
            return e[ea] || null
          })(e)
        )
      }
      function cd(e) {
        return (function Sn(e) {
          return e[ta] || null
        })(e)
      }
      const dd = {}
      function qt(e) {
        return on(() => {
          const t = {
            type: e.type,
            bootstrap: e.bootstrap || J,
            declarations: e.declarations || J,
            imports: e.imports || J,
            exports: e.exports || J,
            transitiveCompileScopes: null,
            schemas: e.schemas || null,
            id: e.id || null,
          }
          return null != e.id && (dd[e.id] = e.type), t
        })
      }
      function fd(e, t) {
        if (null == e) return qn
        const n = {}
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let i = e[r],
              o = i
            Array.isArray(i) && ((o = i[1]), (i = i[0])),
              (n[i] = r),
              t && (t[i] = o)
          }
        return n
      }
      const Ae = qr
      function xe(e) {
        return e[no] || null
      }
      function nt(e, t) {
        const n = e[ud] || null
        if (!n && !0 === t)
          throw new Error(`Type ${Q(e)} does not have '\u0275mod' property.`)
        return n
      }
      const N = 11
      function At(e) {
        return Array.isArray(e) && 'object' == typeof e[1]
      }
      function pt(e) {
        return Array.isArray(e) && !0 === e[1]
      }
      function ia(e) {
        return 0 != (8 & e.flags)
      }
      function so(e) {
        return 2 == (2 & e.flags)
      }
      function ao(e) {
        return 1 == (1 & e.flags)
      }
      function gt(e) {
        return null !== e.template
      }
      function A0(e) {
        return 0 != (512 & e[2])
      }
      function Rn(e, t) {
        return e.hasOwnProperty(Gt) ? e[Gt] : null
      }
      class P0 {
        constructor(t, n, r) {
          ;(this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r)
        }
        isFirstChange() {
          return this.firstChange
        }
      }
      function pd(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = N0), O0
      }
      function O0() {
        const e = md(this),
          t = null == e ? void 0 : e.current
        if (t) {
          const n = e.previous
          if (n === qn) e.previous = t
          else for (let r in t) n[r] = t[r]
          ;(e.current = null), this.ngOnChanges(t)
        }
      }
      function N0(e, t, n, r) {
        const i =
            md(e) ||
            (function F0(e, t) {
              return (e[gd] = t)
            })(e, { previous: qn, current: null }),
          o = i.current || (i.current = {}),
          s = i.previous,
          a = this.declaredInputs[n],
          u = s[a]
        ;(o[a] = new P0(u && u.currentValue, t, s === qn)), (e[r] = t)
      }
      const gd = '__ngSimpleChanges__'
      function md(e) {
        return e[gd] || null
      }
      let la
      function ue(e) {
        return !!e.listen
      }
      const yd = {
        createRenderer: (e, t) =>
          (function ca() {
            return void 0 !== la
              ? la
              : 'undefined' != typeof document
              ? document
              : void 0
          })(),
      }
      function he(e) {
        for (; Array.isArray(e); ) e = e[0]
        return e
      }
      function ot(e, t) {
        return he(t[e.index])
      }
      function da(e, t) {
        return e.data[t]
      }
      function Ze(e, t) {
        const n = t[e]
        return At(n) ? n : n[0]
      }
      function fa(e) {
        return 128 == (128 & e[2])
      }
      function an(e, t) {
        return null == t ? null : e[t]
      }
      function Dd(e) {
        e[18] = 0
      }
      function ha(e, t) {
        e[5] += t
        let n = e,
          r = e[3]
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3])
      }
      const A = {
        lFrame: Sd(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      }
      function _d() {
        return A.bindingsEnabled
      }
      function y() {
        return A.lFrame.lView
      }
      function z() {
        return A.lFrame.tView
      }
      function On(e) {
        return (A.lFrame.contextLView = e), e[8]
      }
      function ve() {
        let e = Cd()
        for (; null !== e && 64 === e.type; ) e = e.parent
        return e
      }
      function Cd() {
        return A.lFrame.currentTNode
      }
      function xt(e, t) {
        const n = A.lFrame
        ;(n.currentTNode = e), (n.isParent = t)
      }
      function pa() {
        return A.lFrame.isParent
      }
      function lo() {
        return A.isInCheckNoChangesMode
      }
      function co(e) {
        A.isInCheckNoChangesMode = e
      }
      function Jn() {
        return A.lFrame.bindingIndex++
      }
      function J0(e, t) {
        const n = A.lFrame
        ;(n.bindingIndex = n.bindingRootIndex = e), ma(t)
      }
      function ma(e) {
        A.lFrame.currentDirectiveIndex = e
      }
      function va(e) {
        A.lFrame.currentQueryIndex = e
      }
      function eD(e) {
        const t = e[1]
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null
      }
      function Md(e, t, n) {
        if (n & x.SkipSelf) {
          let i = t,
            o = e
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & x.Host ||
              ((i = eD(o)), null === i || ((o = o[15]), 10 & i.type)));

          );
          if (null === i) return !1
          ;(t = i), (e = o)
        }
        const r = (A.lFrame = Id())
        return (r.currentTNode = t), (r.lView = e), !0
      }
      function fo(e) {
        const t = Id(),
          n = e[1]
        ;(A.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1)
      }
      function Id() {
        const e = A.lFrame,
          t = null === e ? null : e.child
        return null === t ? Sd(e) : t
      }
      function Sd(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        }
        return null !== e && (e.child = t), t
      }
      function Td() {
        const e = A.lFrame
        return (
          (A.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        )
      }
      const Ad = Td
      function ho() {
        const e = Td()
        ;(e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0)
      }
      function ke() {
        return A.lFrame.selectedIndex
      }
      function un(e) {
        A.lFrame.selectedIndex = e
      }
      function ie() {
        A.lFrame.currentNamespace = 'svg'
      }
      function oe() {
        !(function iD() {
          A.lFrame.currentNamespace = null
        })()
      }
      function po(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const o = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = o
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c)
        }
      }
      function go(e, t, n) {
        xd(e, t, 3, n)
      }
      function mo(e, t, n, r) {
        ;(3 & e[2]) === n && xd(e, t, n, r)
      }
      function Da(e, t) {
        let n = e[2]
        ;(3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n))
      }
      function xd(e, t, n, r) {
        const o = null != r ? r : -1,
          s = t.length - 1
        let a = 0
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ('number' == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < o || -1 == o) &&
                (aD(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++
      }
      function aD(e, t, n, r) {
        const i = n[r] < 0,
          o = n[r + 1],
          a = e[i ? -n[r] : n[r]]
        if (i) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048
            try {
              o.call(a)
            } finally {
            }
          }
        } else
          try {
            o.call(a)
          } finally {
          }
      }
      class Kr {
        constructor(t, n, r) {
          ;(this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r)
        }
      }
      function yo(e, t, n) {
        const r = ue(e)
        let i = 0
        for (; i < n.length; ) {
          const o = n[i]
          if ('number' == typeof o) {
            if (0 !== o) break
            i++
            const s = n[i++],
              a = n[i++],
              u = n[i++]
            r ? e.setAttribute(t, a, u, s) : t.setAttributeNS(s, a, u)
          } else {
            const s = o,
              a = n[++i]
            Ca(s)
              ? r && e.setProperty(t, s, a)
              : r
              ? e.setAttribute(t, s, a)
              : t.setAttribute(s, a),
              i++
          }
        }
        return i
      }
      function Rd(e) {
        return 3 === e || 4 === e || 6 === e
      }
      function Ca(e) {
        return 64 === e.charCodeAt(0)
      }
      function vo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice()
          else {
            let n = -1
            for (let r = 0; r < t.length; r++) {
              const i = t[r]
              'number' == typeof i
                ? (n = i)
                : 0 === n ||
                  Pd(e, n, i, null, -1 === n || 2 === n ? t[++r] : null)
            }
          }
        return e
      }
      function Pd(e, t, n, r, i) {
        let o = 0,
          s = e.length
        if (-1 === t) s = -1
        else
          for (; o < e.length; ) {
            const a = e[o++]
            if ('number' == typeof a) {
              if (a === t) {
                s = -1
                break
              }
              if (a > t) {
                s = o - 1
                break
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o]
          if ('number' == typeof a) break
          if (a === n) {
            if (null === r) return void (null !== i && (e[o + 1] = i))
            if (r === e[o + 1]) return void (e[o + 2] = i)
          }
          o++, null !== r && o++, null !== i && o++
        }
        ;-1 !== s && (e.splice(s, 0, t), (o = s + 1)),
          e.splice(o++, 0, n),
          null !== r && e.splice(o++, 0, r),
          null !== i && e.splice(o++, 0, i)
      }
      function Od(e) {
        return -1 !== e
      }
      function Xn(e) {
        return 32767 & e
      }
      function er(e, t) {
        let n = (function fD(e) {
            return e >> 16
          })(e),
          r = t
        for (; n > 0; ) (r = r[15]), n--
        return r
      }
      let wa = !0
      function Do(e) {
        const t = wa
        return (wa = e), t
      }
      let hD = 0
      function Xr(e, t) {
        const n = ba(e, t)
        if (-1 !== n) return n
        const r = t[1]
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Ea(r.data, e),
          Ea(t, null),
          Ea(r.blueprint, null))
        const i = _o(e, t),
          o = e.injectorIndex
        if (Od(i)) {
          const s = Xn(i),
            a = er(i, t),
            u = a[1].data
          for (let l = 0; l < 8; l++) t[o + l] = a[s + l] | u[s + l]
        }
        return (t[o + 8] = i), o
      }
      function Ea(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
      }
      function ba(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex
      }
      function _o(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex
        let n = 0,
          r = null,
          i = t
        for (; null !== i; ) {
          const o = i[1],
            s = o.type
          if (((r = 2 === s ? o.declTNode : 1 === s ? i[6] : null), null === r))
            return -1
          if ((n++, (i = i[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16)
        }
        return -1
      }
      function Co(e, t, n) {
        !(function pD(e, t, n) {
          let r
          'string' == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Gr) && (r = n[Gr]),
            null == r && (r = n[Gr] = hD++)
          const i = 255 & r
          t.data[e + (i >> 5)] |= 1 << i
        })(e, t, n)
      }
      function kd(e, t, n) {
        if (n & x.Optional) return e
        eo(t, 'NodeInjector')
      }
      function Ld(e, t, n, r) {
        if (
          (n & x.Optional && void 0 === r && (r = null),
          0 == (n & (x.Self | x.Host)))
        ) {
          const i = e[9],
            o = rn(void 0)
          try {
            return i ? i.get(t, r, n & x.Optional) : ad(t, r, n & x.Optional)
          } finally {
            rn(o)
          }
        }
        return kd(r, t, n)
      }
      function jd(e, t, n, r = x.Default, i) {
        if (null !== e) {
          const o = (function vD(e) {
            if ('string' == typeof e) return e.charCodeAt(0) || 0
            const t = e.hasOwnProperty(Gr) ? e[Gr] : void 0
            return 'number' == typeof t ? (t >= 0 ? 255 & t : mD) : t
          })(n)
          if ('function' == typeof o) {
            if (!Md(t, e, r)) return r & x.Host ? kd(i, n, r) : Ld(t, n, r, i)
            try {
              const s = o(r)
              if (null != s || r & x.Optional) return s
              eo(n)
            } finally {
              Ad()
            }
          } else if ('number' == typeof o) {
            let s = null,
              a = ba(e, t),
              u = -1,
              l = r & x.Host ? t[16][6] : null
            for (
              (-1 === a || r & x.SkipSelf) &&
              ((u = -1 === a ? _o(e, t) : t[a + 8]),
              -1 !== u && Hd(r, !1)
                ? ((s = t[1]), (a = Xn(u)), (t = er(u, t)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = t[1]
              if (Bd(o, a, c.data)) {
                const d = yD(a, t, n, s, r, l)
                if (d !== Vd) return d
              }
              ;(u = t[a + 8]),
                -1 !== u && Hd(r, t[1].data[a + 8] === l) && Bd(o, a, t)
                  ? ((s = c), (a = Xn(u)), (t = er(u, t)))
                  : (a = -1)
            }
          }
        }
        return Ld(t, n, r, i)
      }
      const Vd = {}
      function mD() {
        return new tr(ve(), y())
      }
      function yD(e, t, n, r, i, o) {
        const s = t[1],
          a = s.data[e + 8],
          c = (function wo(e, t, n, r, i) {
            const o = e.providerIndexes,
              s = t.data,
              a = 1048575 & o,
              u = e.directiveStart,
              c = o >> 20,
              f = i ? a + c : e.directiveEnd
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h]
              if ((h < u && n === p) || (h >= u && p.type === n)) return h
            }
            if (i) {
              const h = s[u]
              if (h && gt(h) && h.type === n) return u
            }
            return null
          })(
            a,
            s,
            n,
            null == r ? so(a) && wa : r != s && 0 != (3 & a.type),
            i & x.Host && o === a
          )
        return null !== c ? ei(t, s, c, a) : Vd
      }
      function ei(e, t, n, r) {
        let i = e[n]
        const o = t.data
        if (
          (function uD(e) {
            return e instanceof Kr
          })(i)
        ) {
          const s = i
          s.resolving &&
            (function f0(e, t) {
              const n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : ''
              throw new Z(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              )
            })(Ne(o[n]))
          const a = Do(s.canSeeViewProviders)
          s.resolving = !0
          const u = s.injectImpl ? rn(s.injectImpl) : null
          Md(e, r, x.Default)
          try {
            ;(i = e[n] = s.factory(void 0, o, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function sD(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: o,
                  } = t.type.prototype
                  if (r) {
                    const s = pd(t)
                    ;(n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s)
                  }
                  i &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, i),
                    o &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, o))
                })(n, o[n], t)
          } finally {
            null !== u && rn(u), Do(a), (s.resolving = !1), Ad()
          }
        }
        return i
      }
      function Bd(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e))
      }
      function Hd(e, t) {
        return !(e & x.Self || (e & x.Host && t))
      }
      class tr {
        constructor(t, n) {
          ;(this._tNode = t), (this._lView = n)
        }
        get(t, n, r) {
          return jd(this._tNode, this._lView, t, r, n)
        }
      }
      const rr = '__parameters__'
      function or(e, t, n) {
        return on(() => {
          const r = (function Ia(e) {
            return function (...n) {
              if (e) {
                const r = e(...n)
                for (const i in r) this[i] = r[i]
              }
            }
          })(t)
          function i(...o) {
            if (this instanceof i) return r.apply(this, o), this
            const s = new i(...o)
            return (a.annotation = s), a
            function a(u, l, c) {
              const d = u.hasOwnProperty(rr)
                ? u[rr]
                : Object.defineProperty(u, rr, { value: [] })[rr]
              for (; d.length <= c; ) d.push(null)
              return (d[c] = d[c] || []).push(s), u
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          )
        })
      }
      class W {
        constructor(t, n) {
          ;(this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = $({
                  token: this,
                  providedIn: n.providedIn || 'root',
                  factory: n.factory,
                }))
        }
        toString() {
          return `InjectionToken ${this._desc}`
        }
      }
      const CD = new W('AnalyzeForEntryComponents')
      function Rt(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Rt(n, t) : t(n)))
      }
      function $d(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n)
      }
      function Eo(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
      }
      const oi = {},
        xa = '__NG_DI_FLAG__',
        Mo = 'ngTempTokenPath',
        RD = /\n/gm,
        Zd = '__source',
        OD = K({ provide: String, useValue: K })
      let si
      function Qd(e) {
        const t = si
        return (si = e), t
      }
      function ND(e, t = x.Default) {
        if (void 0 === si) throw new Z(203, '')
        return null === si
          ? ad(e, void 0, t)
          : si.get(e, t & x.Optional ? null : void 0, t)
      }
      function S(e, t = x.Default) {
        return (
          (function D0() {
            return Xs
          })() || ND
        )(O(e), t)
      }
      const FD = S
      function Ra(e) {
        const t = []
        for (let n = 0; n < e.length; n++) {
          const r = O(e[n])
          if (Array.isArray(r)) {
            if (0 === r.length) throw new Z(900, '')
            let i,
              o = x.Default
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = kD(a)
              'number' == typeof u
                ? -1 === u
                  ? (i = a.token)
                  : (o |= u)
                : (i = a)
            }
            t.push(S(i, o))
          } else t.push(S(r))
        }
        return t
      }
      function ai(e, t) {
        return (e[xa] = t), (e.prototype[xa] = t), e
      }
      function kD(e) {
        return e[xa]
      }
      const Io = ai(
          or('Inject', (e) => ({ token: e })),
          -1
        ),
        cn = ai(or('Optional'), 8),
        ui = ai(or('SkipSelf'), 4),
        gf = '__ngContext__'
      function Pe(e, t) {
        e[gf] = t
      }
      function Ha(e) {
        const t = (function hi(e) {
          return e[gf] || null
        })(e)
        return t ? (Array.isArray(t) ? t : t.lView) : null
      }
      function $a(e) {
        return e.ngOriginalError
      }
      function T_(e, ...t) {
        e.error(...t)
      }
      class pi {
        constructor() {
          this._console = console
        }
        handleError(t) {
          const n = this._findOriginalError(t),
            r = (function S_(e) {
              return (e && e.ngErrorLogger) || T_
            })(t)
          r(this._console, 'ERROR', t),
            n && r(this._console, 'ORIGINAL ERROR', n)
        }
        _findOriginalError(t) {
          let n = t && $a(t)
          for (; n && $a(n); ) n = $a(n)
          return n || null
        }
      }
      const j_ = (() =>
        (
          ('undefined' != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Y))()
      function Ot(e) {
        return e instanceof Function ? e() : e
      }
      var Ye = (() => (
        ((Ye = Ye || {})[(Ye.Important = 1)] = 'Important'),
        (Ye[(Ye.DashCase = 2)] = 'DashCase'),
        Ye
      ))()
      function Ga(e, t) {
        return undefined(e, t)
      }
      function gi(e) {
        const t = e[3]
        return pt(t) ? t[3] : t
      }
      function qa(e) {
        return bf(e[13])
      }
      function Wa(e) {
        return bf(e[4])
      }
      function bf(e) {
        for (; null !== e && !pt(e); ) e = e[4]
        return e
      }
      function cr(e, t, n, r, i) {
        if (null != r) {
          let o,
            s = !1
          pt(r) ? (o = r) : At(r) && ((s = !0), (r = r[0]))
          const a = he(r)
          0 === e && null !== n
            ? null == i
              ? xf(t, n, a)
              : Nn(t, n, a, i || null, !0)
            : 1 === e && null !== n
            ? Nn(t, n, a, i || null, !0)
            : 2 === e
            ? (function Lf(e, t, n) {
                const r = Po(e, t)
                r &&
                  (function J_(e, t, n, r) {
                    ue(e) ? e.removeChild(t, n, r) : t.removeChild(n)
                  })(e, r, t, n)
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != o &&
              (function tC(e, t, n, r, i) {
                const o = n[7]
                o !== he(n) && cr(t, e, r, o, i)
                for (let a = 10; a < n.length; a++) {
                  const u = n[a]
                  mi(u[1], u, e, t, r, o)
                }
              })(t, e, o, n, i)
        }
      }
      function Qa(e, t, n) {
        if (ue(e)) return e.createElement(t, n)
        {
          const r =
            null !== n
              ? (function V0(e) {
                  const t = e.toLowerCase()
                  return 'svg' === t
                    ? 'http://www.w3.org/2000/svg'
                    : 'math' === t
                    ? 'http://www.w3.org/1998/MathML/'
                    : null
                })(n)
              : null
          return null === r ? e.createElement(t) : e.createElementNS(r, t)
        }
      }
      function If(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          i = t[3]
        1024 & t[2] && ((t[2] &= -1025), ha(i, -1)), n.splice(r, 1)
      }
      function Ya(e, t) {
        if (e.length <= 10) return
        const n = 10 + t,
          r = e[n]
        if (r) {
          const i = r[17]
          null !== i && i !== e && If(i, r), t > 0 && (e[n - 1][4] = r[4])
          const o = Eo(e, 10 + t)
          !(function z_(e, t) {
            mi(e, t, t[N], 2, null, null), (t[0] = null), (t[6] = null)
          })(r[1], r)
          const s = o[19]
          null !== s && s.detachView(o[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129)
        }
        return r
      }
      function Sf(e, t) {
        if (!(256 & t[2])) {
          const n = t[N]
          ue(n) && n.destroyNode && mi(e, t, n, 3, null, null),
            (function W_(e) {
              let t = e[13]
              if (!t) return Ka(e[1], e)
              for (; t; ) {
                let n = null
                if (At(t)) n = t[13]
                else {
                  const r = t[10]
                  r && (n = r)
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    At(t) && Ka(t[1], t), (t = t[3])
                  null === t && (t = e), At(t) && Ka(t[1], t), (n = t && t[4])
                }
                t = n
              }
            })(t)
        }
      }
      function Ka(e, t) {
        if (!(256 & t[2])) {
          ;(t[2] &= -129),
            (t[2] |= 256),
            (function K_(e, t) {
              let n
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = t[n[r]]
                  if (!(i instanceof Kr)) {
                    const o = n[r + 1]
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = i[o[s]],
                          u = o[s + 1]
                        try {
                          u.call(a)
                        } finally {
                        }
                      }
                    else
                      try {
                        o.call(i)
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function Y_(e, t) {
              const n = e.cleanup,
                r = t[7]
              let i = -1
              if (null !== n)
                for (let o = 0; o < n.length - 1; o += 2)
                  if ('string' == typeof n[o]) {
                    const s = n[o + 1],
                      a = 'function' == typeof s ? s(t) : he(t[s]),
                      u = r[(i = n[o + 2])],
                      l = n[o + 3]
                    'boolean' == typeof l
                      ? a.removeEventListener(n[o], u, l)
                      : l >= 0
                      ? r[(i = l)]()
                      : r[(i = -l)].unsubscribe(),
                      (o += 2)
                  } else {
                    const s = r[(i = n[o + 1])]
                    n[o].call(s)
                  }
              if (null !== r) {
                for (let o = i + 1; o < r.length; o++) r[o]()
                t[7] = null
              }
            })(e, t),
            1 === t[1].type && ue(t[N]) && t[N].destroy()
          const n = t[17]
          if (null !== n && pt(t[3])) {
            n !== t[3] && If(n, t)
            const r = t[19]
            null !== r && r.detachView(e)
          }
        }
      }
      function Tf(e, t, n) {
        return (function Af(e, t, n) {
          let r = t
          for (; null !== r && 40 & r.type; ) r = (t = r).parent
          if (null === r) return n[0]
          if (2 & r.flags) {
            const i = e.data[r.directiveStart].encapsulation
            if (i === Tt.None || i === Tt.Emulated) return null
          }
          return ot(r, n)
        })(e, t.parent, n)
      }
      function Nn(e, t, n, r, i) {
        ue(e) ? e.insertBefore(t, n, r, i) : t.insertBefore(n, r, i)
      }
      function xf(e, t, n) {
        ue(e) ? e.appendChild(t, n) : t.appendChild(n)
      }
      function Rf(e, t, n, r, i) {
        null !== r ? Nn(e, t, n, r, i) : xf(e, t, n)
      }
      function Po(e, t) {
        return ue(e) ? e.parentNode(t) : t.parentNode
      }
      let Nf = function Of(e, t, n) {
        return 40 & e.type ? ot(e, n) : null
      }
      function Oo(e, t, n, r) {
        const i = Tf(e, r, t),
          o = t[N],
          a = (function Pf(e, t, n) {
            return Nf(e, t, n)
          })(r.parent || t[6], r, t)
        if (null != i)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Rf(o, i, n[u], a, !1)
          else Rf(o, i, n, a, !1)
      }
      function No(e, t) {
        if (null !== t) {
          const n = t.type
          if (3 & n) return ot(t, e)
          if (4 & n) return Xa(-1, e[t.index])
          if (8 & n) {
            const r = t.child
            if (null !== r) return No(e, r)
            {
              const i = e[t.index]
              return pt(i) ? Xa(-1, i) : he(i)
            }
          }
          if (32 & n) return Ga(t, e)() || he(e[t.index])
          {
            const r = kf(e, t)
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : No(gi(e[16]), r)
              : No(e, t.next)
          }
        }
        return null
      }
      function kf(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null
      }
      function Xa(e, t) {
        const n = 10 + e + 1
        if (n < t.length) {
          const r = t[n],
            i = r[1].firstChild
          if (null !== i) return No(r, i)
        }
        return t[7]
      }
      function eu(e, t, n, r, i, o, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type
          if (
            (s && 0 === t && (a && Pe(he(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) eu(e, t, n.child, r, i, o, !1), cr(t, e, i, a, o)
            else if (32 & u) {
              const l = Ga(n, r)
              let c
              for (; (c = l()); ) cr(t, e, i, c, o)
              cr(t, e, i, a, o)
            } else 16 & u ? jf(e, t, r, n, i, o) : cr(t, e, i, a, o)
          n = s ? n.projectionNext : n.next
        }
      }
      function mi(e, t, n, r, i, o) {
        eu(n, r, e.firstChild, t, i, o, !1)
      }
      function jf(e, t, n, r, i, o) {
        const s = n[16],
          u = s[6].projection[r.projection]
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) cr(t, e, i, u[l], o)
        else eu(e, t, u, s[3], i, o, !0)
      }
      function Vf(e, t, n) {
        ue(e) ? e.setAttribute(t, 'style', n) : (t.style.cssText = n)
      }
      function tu(e, t, n) {
        ue(e)
          ? '' === n
            ? e.removeAttribute(t, 'class')
            : e.setAttribute(t, 'class', n)
          : (t.className = n)
      }
      function Bf(e, t, n) {
        let r = e.length
        for (;;) {
          const i = e.indexOf(t, n)
          if (-1 === i) return i
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const o = t.length
            if (i + o === r || e.charCodeAt(i + o) <= 32) return i
          }
          n = i + 1
        }
      }
      const Hf = 'ng-template'
      function rC(e, t, n) {
        let r = 0
        for (; r < e.length; ) {
          let i = e[r++]
          if (n && 'class' === i) {
            if (((i = e[r]), -1 !== Bf(i.toLowerCase(), t, 0))) return !0
          } else if (1 === i) {
            for (; r < e.length && 'string' == typeof (i = e[r++]); )
              if (i.toLowerCase() === t) return !0
            return !1
          }
        }
        return !1
      }
      function Uf(e) {
        return 4 === e.type && e.value !== Hf
      }
      function iC(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Hf)
      }
      function oC(e, t, n) {
        let r = 4
        const i = e.attrs || [],
          o = (function uC(e) {
            for (let t = 0; t < e.length; t++) if (Rd(e[t])) return t
            return e.length
          })(i)
        let s = !1
        for (let a = 0; a < t.length; a++) {
          const u = t[a]
          if ('number' != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ('' !== u && !iC(e, u, n)) || ('' === u && 1 === t.length))
                ) {
                  if (mt(r)) return !1
                  s = !0
                }
              } else {
                const l = 8 & r ? u : t[++a]
                if (8 & r && null !== e.attrs) {
                  if (!rC(e.attrs, l, n)) {
                    if (mt(r)) return !1
                    s = !0
                  }
                  continue
                }
                const d = sC(8 & r ? 'class' : u, i, Uf(e), n)
                if (-1 === d) {
                  if (mt(r)) return !1
                  s = !0
                  continue
                }
                if ('' !== l) {
                  let f
                  f = d > o ? '' : i[d + 1].toLowerCase()
                  const h = 8 & r ? f : null
                  if ((h && -1 !== Bf(h, l, 0)) || (2 & r && l !== f)) {
                    if (mt(r)) return !1
                    s = !0
                  }
                }
              }
          } else {
            if (!s && !mt(r) && !mt(u)) return !1
            if (s && mt(u)) continue
            ;(s = !1), (r = u | (1 & r))
          }
        }
        return mt(r) || s
      }
      function mt(e) {
        return 0 == (1 & e)
      }
      function sC(e, t, n, r) {
        if (null === t) return -1
        let i = 0
        if (r || !n) {
          let o = !1
          for (; i < t.length; ) {
            const s = t[i]
            if (s === e) return i
            if (3 === s || 6 === s) o = !0
            else {
              if (1 === s || 2 === s) {
                let a = t[++i]
                for (; 'string' == typeof a; ) a = t[++i]
                continue
              }
              if (4 === s) break
              if (0 === s) {
                i += 4
                continue
              }
            }
            i += o ? 1 : 2
          }
          return -1
        }
        return (function lC(e, t) {
          let n = e.indexOf(4)
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n]
              if ('number' == typeof r) return -1
              if (r === t) return n
              n++
            }
          return -1
        })(t, e)
      }
      function $f(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (oC(e, t[r], n)) return !0
        return !1
      }
      function zf(e, t) {
        return e ? ':not(' + t.trim() + ')' : t
      }
      function dC(e) {
        let t = e[0],
          n = 1,
          r = 2,
          i = '',
          o = !1
        for (; n < e.length; ) {
          let s = e[n]
          if ('string' == typeof s)
            if (2 & r) {
              const a = e[++n]
              i += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']'
            } else 8 & r ? (i += '.' + s) : 4 & r && (i += ' ' + s)
          else
            '' !== i && !mt(s) && ((t += zf(o, i)), (i = '')),
              (r = s),
              (o = o || !mt(r))
          n++
        }
        return '' !== i && (t += zf(o, i)), t
      }
      const P = {}
      function fn(e) {
        Gf(z(), y(), ke() + e, lo())
      }
      function Gf(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const o = e.preOrderCheckHooks
            null !== o && go(t, o, n)
          } else {
            const o = e.preOrderHooks
            null !== o && mo(t, o, 0, n)
          }
        un(n)
      }
      function nh(e, t) {
        const n = e.contentQueries
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r],
              o = n[r + 1]
            if (-1 !== o) {
              const s = e.data[o]
              va(i), s.contentQueries(2, t[o], o)
            }
          }
      }
      function yi(e, t, n, r, i, o, s, a, u, l) {
        const c = t.blueprint.slice()
        return (
          (c[0] = i),
          (c[2] = 140 | r),
          Dd(c),
          (c[3] = c[15] = e),
          (c[8] = n),
          (c[10] = s || (e && e[10])),
          (c[N] = a || (e && e[N])),
          (c[12] = u || (e && e[12]) || null),
          (c[9] = l || (e && e[9]) || null),
          (c[6] = o),
          (c[16] = 2 == t.type ? e[16] : c),
          c
        )
      }
      function dr(e, t, n, r, i) {
        let o = e.data[t]
        if (null === o)
          (o = (function hu(e, t, n, r, i) {
            const o = Cd(),
              s = pa(),
              u = (e.data[t] = (function AC(e, t, n, r, i, o) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: i,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                }
              })(0, s ? o : o && o.parent, n, t, r, i))
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== o &&
                (s
                  ? null == o.child && null !== u.parent && (o.child = u)
                  : null === o.next && (o.next = u)),
              u
            )
          })(e, t, n, r, i)),
            (function K0() {
              return A.lFrame.inI18n
            })() && (o.flags |= 64)
        else if (64 & o.type) {
          ;(o.type = n), (o.value = r), (o.attrs = i)
          const s = (function Yr() {
            const e = A.lFrame,
              t = e.currentTNode
            return e.isParent ? t : t.parent
          })()
          o.injectorIndex = null === s ? -1 : s.injectorIndex
        }
        return xt(o, !0), o
      }
      function fr(e, t, n, r) {
        if (0 === n) return -1
        const i = t.length
        for (let o = 0; o < n; o++)
          t.push(r), e.blueprint.push(r), e.data.push(null)
        return i
      }
      function vi(e, t, n) {
        fo(t)
        try {
          const r = e.viewQuery
          null !== r && wu(1, r, n)
          const i = e.template
          null !== i && rh(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && nh(e, t),
            e.staticViewQueries && wu(2, e.viewQuery, n)
          const o = e.components
          null !== o &&
            (function IC(e, t) {
              for (let n = 0; n < t.length; n++) WC(e, t[n])
            })(t, o)
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          )
        } finally {
          ;(t[2] &= -5), ho()
        }
      }
      function hr(e, t, n, r) {
        const i = t[2]
        if (256 == (256 & i)) return
        fo(t)
        const o = lo()
        try {
          Dd(t),
            (function wd(e) {
              return (A.lFrame.bindingIndex = e)
            })(e.bindingStartIndex),
            null !== n && rh(e, t, n, 2, r)
          const s = 3 == (3 & i)
          if (!o)
            if (s) {
              const l = e.preOrderCheckHooks
              null !== l && go(t, l, null)
            } else {
              const l = e.preOrderHooks
              null !== l && mo(t, l, 0, null), Da(t, 0)
            }
          if (
            ((function GC(e) {
              for (let t = qa(e); null !== t; t = Wa(t)) {
                if (!t[2]) continue
                const n = t[9]
                for (let r = 0; r < n.length; r++) {
                  const i = n[r],
                    o = i[3]
                  0 == (1024 & i[2]) && ha(o, 1), (i[2] |= 1024)
                }
              }
            })(t),
            (function zC(e) {
              for (let t = qa(e); null !== t; t = Wa(t))
                for (let n = 10; n < t.length; n++) {
                  const r = t[n],
                    i = r[1]
                  fa(r) && hr(i, r, i.template, r[8])
                }
            })(t),
            null !== e.contentQueries && nh(e, t),
            !o)
          )
            if (s) {
              const l = e.contentCheckHooks
              null !== l && go(t, l)
            } else {
              const l = e.contentHooks
              null !== l && mo(t, l, 1), Da(t, 1)
            }
          !(function bC(e, t) {
            const n = e.hostBindingOpCodes
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const i = n[r]
                  if (i < 0) un(~i)
                  else {
                    const o = i,
                      s = n[++r],
                      a = n[++r]
                    J0(s, o), a(2, t[o])
                  }
                }
              } finally {
                un(-1)
              }
          })(e, t)
          const a = e.components
          null !== a &&
            (function MC(e, t) {
              for (let n = 0; n < t.length; n++) qC(e, t[n])
            })(t, a)
          const u = e.viewQuery
          if ((null !== u && wu(2, u, r), !o))
            if (s) {
              const l = e.viewCheckHooks
              null !== l && go(t, l)
            } else {
              const l = e.viewHooks
              null !== l && mo(t, l, 2), Da(t, 2)
            }
          !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
            o || (t[2] &= -73),
            1024 & t[2] && ((t[2] &= -1025), ha(t[3], -1))
        } finally {
          ho()
        }
      }
      function SC(e, t, n, r) {
        const i = t[10],
          o = !lo(),
          s = (function vd(e) {
            return 4 == (4 & e[2])
          })(t)
        try {
          o && !s && i.begin && i.begin(), s && vi(e, t, r), hr(e, t, n, r)
        } finally {
          o && !s && i.end && i.end()
        }
      }
      function rh(e, t, n, r, i) {
        const o = ke(),
          s = 2 & r
        try {
          un(-1), s && t.length > 20 && Gf(e, t, 20, lo()), n(r, i)
        } finally {
          un(o)
        }
      }
      function pu(e, t, n) {
        !_d() ||
          ((function kC(e, t, n, r) {
            const i = n.directiveStart,
              o = n.directiveEnd
            e.firstCreatePass || Xr(n, t), Pe(r, t)
            const s = n.initialInputs
            for (let a = i; a < o; a++) {
              const u = e.data[a],
                l = gt(u)
              l && HC(t, n, u)
              const c = ei(t, e, a, n)
              Pe(c, t),
                null !== s && UC(0, a - i, c, u, 0, s),
                l && (Ze(n.index, t)[8] = c)
            }
          })(e, t, n, ot(n, t)),
          128 == (128 & n.flags) &&
            (function LC(e, t, n) {
              const r = n.directiveStart,
                i = n.directiveEnd,
                s = n.index,
                a = (function X0() {
                  return A.lFrame.currentDirectiveIndex
                })()
              try {
                un(s)
                for (let u = r; u < i; u++) {
                  const l = e.data[u],
                    c = t[u]
                  ma(u),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      fh(l, c)
                }
              } finally {
                un(-1), ma(a)
              }
            })(e, t, n))
      }
      function gu(e, t, n = ot) {
        const r = t.localNames
        if (null !== r) {
          let i = t.index + 1
          for (let o = 0; o < r.length; o += 2) {
            const s = r[o + 1],
              a = -1 === s ? n(t, e) : e[s]
            e[i++] = a
          }
        }
      }
      function oh(e) {
        const t = e.tView
        return null === t || t.incompleteFirstPass
          ? (e.tView = jo(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t
      }
      function jo(e, t, n, r, i, o, s, a, u, l) {
        const c = 20 + r,
          d = c + i,
          f = (function TC(e, t) {
            const n = []
            for (let r = 0; r < t; r++) n.push(r < e ? null : P)
            return n
          })(c, d),
          h = 'function' == typeof l ? l() : l
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof o ? o() : o,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        })
      }
      function lh(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const i = e[r]
            ;(n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, i)
              : (n[r] = [t, i])
          }
        return n
      }
      function mu(e, t, n, r) {
        let i = !1
        if (_d()) {
          const o = (function jC(e, t, n) {
              const r = e.directiveRegistry
              let i = null
              if (r)
                for (let o = 0; o < r.length; o++) {
                  const s = r[o]
                  $f(n, s.selectors, !1) &&
                    (i || (i = []),
                    Co(Xr(n, t), e, s.type),
                    gt(s) ? (hh(e, n), i.unshift(s)) : i.push(s))
                }
              return i
            })(e, t, n),
            s = null === r ? null : { '': -1 }
          if (null !== o) {
            ;(i = !0), ph(n, e.data.length, o.length)
            for (let c = 0; c < o.length; c++) {
              const d = o[c]
              d.providersResolver && d.providersResolver(d)
            }
            let a = !1,
              u = !1,
              l = fr(e, t, o.length, null)
            for (let c = 0; c < o.length; c++) {
              const d = o[c]
              ;(n.mergedAttrs = vo(n.mergedAttrs, d.hostAttrs)),
                gh(e, n, t, l, d),
                BC(l, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128)
              const f = d.type.prototype
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !u &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (u = !0)),
                l++
            }
            !(function xC(e, t) {
              const r = t.directiveEnd,
                i = e.data,
                o = t.attrs,
                s = []
              let a = null,
                u = null
              for (let l = t.directiveStart; l < r; l++) {
                const c = i[l],
                  d = c.inputs,
                  f = null === o || Uf(t) ? null : $C(d, o)
                s.push(f), (a = lh(d, l, a)), (u = lh(c.outputs, l, u))
              }
              null !== a &&
                (a.hasOwnProperty('class') && (t.flags |= 16),
                a.hasOwnProperty('style') && (t.flags |= 32)),
                (t.initialInputs = s),
                (t.inputs = a),
                (t.outputs = u)
            })(e, n)
          }
          s &&
            (function VC(e, t, n) {
              if (t) {
                const r = (e.localNames = [])
                for (let i = 0; i < t.length; i += 2) {
                  const o = n[t[i + 1]]
                  if (null == o) throw new Z(-301, !1)
                  r.push(t[i], o)
                }
              }
            })(n, r, s)
        }
        return (n.mergedAttrs = vo(n.mergedAttrs, n.attrs)), i
      }
      function dh(e, t, n, r, i, o) {
        const s = o.hostBindings
        if (s) {
          let a = e.hostBindingOpCodes
          null === a && (a = e.hostBindingOpCodes = [])
          const u = ~t.index
          ;(function FC(e) {
            let t = e.length
            for (; t > 0; ) {
              const n = e[--t]
              if ('number' == typeof n && n < 0) return n
            }
            return 0
          })(a) != u && a.push(u),
            a.push(r, i, s)
        }
      }
      function fh(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t)
      }
      function hh(e, t) {
        ;(t.flags |= 2), (e.components || (e.components = [])).push(t.index)
      }
      function BC(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e
          gt(t) && (n[''] = e)
        }
      }
      function ph(e, t, n) {
        ;(e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t)
      }
      function gh(e, t, n, r, i) {
        e.data[r] = i
        const o = i.factory || (i.factory = Rn(i.type)),
          s = new Kr(o, gt(i), null)
        ;(e.blueprint[r] = s),
          (n[r] = s),
          dh(e, t, 0, r, fr(e, n, i.hostVars, P), i)
      }
      function HC(e, t, n) {
        const r = ot(t, e),
          i = oh(n),
          o = e[10],
          s = Vo(
            e,
            yi(
              e,
              i,
              null,
              n.onPush ? 64 : 16,
              r,
              t,
              o,
              o.createRenderer(r, n),
              null,
              null
            )
          )
        e[t.index] = s
      }
      function UC(e, t, n, r, i, o) {
        const s = o[t]
        if (null !== s) {
          const a = r.setInput
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++]
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d)
          }
        }
      }
      function $C(e, t) {
        let n = null,
          r = 0
        for (; r < t.length; ) {
          const i = t[r]
          if (0 !== i)
            if (5 !== i) {
              if ('number' == typeof i) break
              e.hasOwnProperty(i) &&
                (null === n && (n = []), n.push(i, e[i], t[r + 1])),
                (r += 2)
            } else r += 2
          else r += 4
        }
        return n
      }
      function mh(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null)
      }
      function qC(e, t) {
        const n = Ze(t, e)
        if (fa(n)) {
          const r = n[1]
          80 & n[2] ? hr(r, n, r.template, n[8]) : n[5] > 0 && vu(n)
        }
      }
      function vu(e) {
        for (let r = qa(e); null !== r; r = Wa(r))
          for (let i = 10; i < r.length; i++) {
            const o = r[i]
            if (1024 & o[2]) {
              const s = o[1]
              hr(s, o, s.template, o[8])
            } else o[5] > 0 && vu(o)
          }
        const n = e[1].components
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const i = Ze(n[r], e)
            fa(i) && i[5] > 0 && vu(i)
          }
      }
      function WC(e, t) {
        const n = Ze(t, e),
          r = n[1]
        ;(function ZC(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n])
        })(r, n),
          vi(r, n, n[8])
      }
      function Vo(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t
      }
      function Du(e) {
        for (; e; ) {
          e[2] |= 64
          const t = gi(e)
          if (A0(e) && !t) return e
          e = t
        }
        return null
      }
      function Cu(e, t, n) {
        const r = t[10]
        r.begin && r.begin()
        try {
          hr(e, t, e.template, n)
        } catch (i) {
          throw (Ch(t, i), i)
        } finally {
          r.end && r.end()
        }
      }
      function yh(e) {
        !(function _u(e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              r = Ha(n),
              i = r[1]
            SC(i, r, i.template, n)
          }
        })(e[8])
      }
      function wu(e, t, n) {
        va(0), t(e, n)
      }
      const JC = (() => Promise.resolve(null))()
      function vh(e) {
        return e[7] || (e[7] = [])
      }
      function Dh(e) {
        return e.cleanup || (e.cleanup = [])
      }
      function Ch(e, t) {
        const n = e[9],
          r = n ? n.get(pi, null) : null
        r && r.handleError(t)
      }
      function wh(e, t, n, r, i) {
        for (let o = 0; o < n.length; ) {
          const s = n[o++],
            a = n[o++],
            u = t[s],
            l = e.data[s]
          null !== l.setInput ? l.setInput(u, i, r, a) : (u[a] = i)
        }
      }
      function Yt(e, t, n) {
        const r = (function uo(e, t) {
          return he(t[e])
        })(t, e)
        !(function Mf(e, t, n) {
          ue(e) ? e.setValue(t, n) : (t.textContent = n)
        })(e[N], r, n)
      }
      function Bo(e, t, n) {
        let r = n ? e.styles : null,
          i = n ? e.classes : null,
          o = 0
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s]
            'number' == typeof a
              ? (o = a)
              : 1 == o
              ? (i = Zs(i, a))
              : 2 == o && (r = Zs(r, a + ': ' + t[++s] + ';'))
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = i) : (e.classesWithoutHost = i)
      }
      const Eu = new W('INJECTOR', -1)
      class Eh {
        get(t, n = oi) {
          if (n === oi) {
            const r = new Error(`NullInjectorError: No provider for ${Q(t)}!`)
            throw ((r.name = 'NullInjectorError'), r)
          }
          return n
        }
      }
      const bu = new W('Set Injector scope.'),
        Di = {},
        tw = {}
      let Mu
      function bh() {
        return void 0 === Mu && (Mu = new Eh()), Mu
      }
      function Mh(e, t = null, n = null, r) {
        const i = Ih(e, t, n, r)
        return i._resolveInjectorDefTypes(), i
      }
      function Ih(e, t = null, n = null, r) {
        return new nw(e, n, t || bh(), r)
      }
      class nw {
        constructor(t, n, r, i = null) {
          ;(this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1)
          const o = []
          n && Rt(n, (a) => this.processProvider(a, t, n)),
            Rt([t], (a) => this.processInjectorType(a, [], o)),
            this.records.set(Eu, pr(void 0, this))
          const s = this.records.get(bu)
          ;(this.scope = null != s ? s.value : null),
            (this.source = i || ('object' == typeof t ? null : Q(t)))
        }
        get destroyed() {
          return this._destroyed
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0)
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy())
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear()
          }
        }
        get(t, n = oi, r = x.Default) {
          this.assertNotDestroyed()
          const i = Qd(this),
            o = rn(void 0)
          try {
            if (!(r & x.SkipSelf)) {
              let a = this.records.get(t)
              if (void 0 === a) {
                const u =
                  (function cw(e) {
                    return (
                      'function' == typeof e ||
                      ('object' == typeof e && e instanceof W)
                    )
                  })(t) && Ks(t)
                ;(a = u && this.injectableDefInScope(u) ? pr(Iu(t), Di) : null),
                  this.records.set(t, a)
              }
              if (null != a) return this.hydrate(t, a)
            }
            return (r & x.Self ? bh() : this.parent).get(
              t,
              (n = r & x.Optional && n === oi ? null : n)
            )
          } catch (s) {
            if ('NullInjectorError' === s.name) {
              if (((s[Mo] = s[Mo] || []).unshift(Q(t)), i)) throw s
              return (function LD(e, t, n, r) {
                const i = e[Mo]
                throw (
                  (t[Zd] && i.unshift(t[Zd]),
                  (e.message = (function jD(e, t, n, r = null) {
                    e =
                      e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1)
                        ? e.substr(2)
                        : e
                    let i = Q(t)
                    if (Array.isArray(t)) i = t.map(Q).join(' -> ')
                    else if ('object' == typeof t) {
                      let o = []
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s]
                          o.push(
                            s +
                              ':' +
                              ('string' == typeof a ? JSON.stringify(a) : Q(a))
                          )
                        }
                      i = `{${o.join(', ')}}`
                    }
                    return `${n}${r ? '(' + r + ')' : ''}[${i}]: ${e.replace(
                      RD,
                      '\n  '
                    )}`
                  })('\n' + e.message, i, n, r)),
                  (e.ngTokenPath = i),
                  (e[Mo] = null),
                  e)
                )
              })(s, t, 'R3InjectorError', this.source)
            }
            throw s
          } finally {
            rn(o), Qd(i)
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t))
        }
        toString() {
          const t = []
          return (
            this.records.forEach((r, i) => t.push(Q(i))),
            `R3Injector[${t.join(', ')}]`
          )
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new Z(205, !1)
        }
        processInjectorType(t, n, r) {
          if (!(t = O(t))) return !1
          let i = od(t)
          const o = (null == i && t.ngModule) || void 0,
            s = void 0 === o ? t : o,
            a = -1 !== r.indexOf(s)
          if ((void 0 !== o && (i = od(o)), null == i)) return !1
          if (null != i.imports && !a) {
            let c
            r.push(s)
            try {
              Rt(i.imports, (d) => {
                this.processInjectorType(d, n, r) &&
                  (void 0 === c && (c = []), c.push(d))
              })
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d]
                Rt(h, (p) => this.processProvider(p, f, h || J))
              }
          }
          this.injectorDefTypes.add(s)
          const u = Rn(s) || (() => new s())
          this.records.set(s, pr(u, Di))
          const l = i.providers
          if (null != l && !a) {
            const c = t
            Rt(l, (d) => this.processProvider(d, c, l))
          }
          return void 0 !== o && void 0 !== t.providers
        }
        processProvider(t, n, r) {
          let i = gr((t = O(t))) ? t : O(t && t.provide)
          const o = (function iw(e, t, n) {
            return Th(e)
              ? pr(void 0, e.useValue)
              : pr(
                  (function Sh(e, t, n) {
                    let r
                    if (gr(e)) {
                      const i = O(e)
                      return Rn(i) || Iu(i)
                    }
                    if (Th(e)) r = () => O(e.useValue)
                    else if (
                      (function sw(e) {
                        return !(!e || !e.useFactory)
                      })(e)
                    )
                      r = () => e.useFactory(...Ra(e.deps || []))
                    else if (
                      (function ow(e) {
                        return !(!e || !e.useExisting)
                      })(e)
                    )
                      r = () => S(O(e.useExisting))
                    else {
                      const i = O(e && (e.useClass || e.provide))
                      if (
                        !(function uw(e) {
                          return !!e.deps
                        })(e)
                      )
                        return Rn(i) || Iu(i)
                      r = () => new i(...Ra(e.deps))
                    }
                    return r
                  })(e),
                  Di
                )
          })(t)
          if (gr(t) || !0 !== t.multi) this.records.get(i)
          else {
            let s = this.records.get(i)
            s ||
              ((s = pr(void 0, Di, !0)),
              (s.factory = () => Ra(s.multi)),
              this.records.set(i, s)),
              (i = t),
              s.multi.push(t)
          }
          this.records.set(i, o)
        }
        hydrate(t, n) {
          return (
            n.value === Di && ((n.value = tw), (n.value = n.factory())),
            'object' == typeof n.value &&
              n.value &&
              (function lw(e) {
                return (
                  null !== e &&
                  'object' == typeof e &&
                  'function' == typeof e.ngOnDestroy
                )
              })(n.value) &&
              this.onDestroy.add(n.value),
            n.value
          )
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1
          const n = O(t.providedIn)
          return 'string' == typeof n
            ? 'any' === n || n === this.scope
            : this.injectorDefTypes.has(n)
        }
      }
      function Iu(e) {
        const t = Ks(e),
          n = null !== t ? t.factory : Rn(e)
        if (null !== n) return n
        if (e instanceof W) throw new Z(204, !1)
        if (e instanceof Function)
          return (function rw(e) {
            const t = e.length
            if (t > 0)
              throw (
                ((function ii(e, t) {
                  const n = []
                  for (let r = 0; r < e; r++) n.push(t)
                  return n
                })(t, '?'),
                new Z(204, !1))
              )
            const n = (function m0(e) {
              const t = e && (e[to] || e[sd])
              if (t) {
                const n = (function y0(e) {
                  if (e.hasOwnProperty('name')) return e.name
                  const t = ('' + e).match(/^function\s*([^\s(]+)/)
                  return null === t ? '' : t[1]
                })(e)
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                )
              }
              return null
            })(e)
            return null !== n ? () => n.factory(e) : () => new e()
          })(e)
        throw new Z(204, !1)
      }
      function pr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 }
      }
      function Th(e) {
        return null !== e && 'object' == typeof e && OD in e
      }
      function gr(e) {
        return 'function' == typeof e
      }
      let $e = (() => {
        class e {
          static create(n, r) {
            var i
            if (Array.isArray(n)) return Mh({ name: '' }, r, n, '')
            {
              const o = null !== (i = n.name) && void 0 !== i ? i : ''
              return Mh({ name: o }, n.parent, n.providers, o)
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = oi),
          (e.NULL = new Eh()),
          (e.ɵprov = $({ token: e, providedIn: 'any', factory: () => S(Eu) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        )
      })()
      function vw(e, t) {
        po(Ha(e)[1], ve())
      }
      function Oe(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0)
      }
      function kn(e, t, n, r, i, o, s, a) {
        const u = y(),
          l = z(),
          c = e + 20,
          d = l.firstCreatePass
            ? (function Aw(e, t, n, r, i, o, s, a, u) {
                const l = t.consts,
                  c = dr(t, e, 4, s || null, an(l, a))
                mu(t, n, c, an(l, u)), po(t, c)
                const d = (c.tViews = jo(
                  2,
                  c,
                  r,
                  i,
                  o,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l
                ))
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                )
              })(c, l, u, t, n, r, i, o, s)
            : l.data[c]
        xt(d, !1)
        const f = u[N].createComment('')
        Oo(l, u, f, d),
          Pe(f, u),
          Vo(u, (u[c] = mh(f, u, f, d))),
          ao(d) && pu(l, u, d),
          null != s && gu(u, d, a)
      }
      function gn(e) {
        return (function Kn(e, t) {
          return e[t]
        })(
          (function Y0() {
            return A.lFrame.contextLView
          })(),
          20 + e
        )
      }
      function M(e, t = x.Default) {
        const n = y()
        return null === n ? S(e, t) : jd(ve(), n, O(e), t)
      }
      function ku() {
        throw new Error('invalid')
      }
      function mn(e, t, n) {
        const r = y()
        return (
          Oe(r, Jn(), t) &&
            (function Ke(e, t, n, r, i, o, s, a) {
              const u = ot(t, n)
              let c,
                l = t.inputs
              !a && null != l && (c = l[r])
                ? (wh(e, n, c, r, i),
                  so(t) &&
                    (function PC(e, t) {
                      const n = Ze(t, e)
                      16 & n[2] || (n[2] |= 64)
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function RC(e) {
                    return 'class' === e
                      ? 'className'
                      : 'for' === e
                      ? 'htmlFor'
                      : 'formaction' === e
                      ? 'formAction'
                      : 'innerHtml' === e
                      ? 'innerHTML'
                      : 'readonly' === e
                      ? 'readOnly'
                      : 'tabindex' === e
                      ? 'tabIndex'
                      : e
                  })(r)),
                  (i = null != s ? s(i, t.value || '', r) : i),
                  ue(o)
                    ? o.setProperty(u, r, i)
                    : Ca(r) ||
                      (u.setProperty ? u.setProperty(r, i) : (u[r] = i)))
            })(
              z(),
              (function le() {
                const e = A.lFrame
                return da(e.tView, e.selectedIndex)
              })(),
              r,
              e,
              t,
              r[N],
              n,
              !1
            ),
          mn
        )
      }
      function Lu(e, t, n, r, i) {
        const s = i ? 'class' : 'style'
        wh(e, n, t.inputs[s], s, r)
      }
      function _(e, t, n, r) {
        const i = y(),
          o = z(),
          s = 20 + e,
          a = i[N],
          u = (i[s] = Qa(
            a,
            t,
            (function oD() {
              return A.lFrame.currentNamespace
            })()
          )),
          l = o.firstCreatePass
            ? (function Yw(e, t, n, r, i, o, s) {
                const a = t.consts,
                  l = dr(t, e, 2, i, an(a, o))
                return (
                  mu(t, n, l, an(a, s)),
                  null !== l.attrs && Bo(l, l.attrs, !1),
                  null !== l.mergedAttrs && Bo(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                )
              })(s, o, i, 0, t, n, r)
            : o.data[s]
        xt(l, !0)
        const c = l.mergedAttrs
        null !== c && yo(a, u, c)
        const d = l.classes
        null !== d && tu(a, u, d)
        const f = l.styles
        return (
          null !== f && Vf(a, u, f),
          64 != (64 & l.flags) && Oo(o, i, u, l),
          0 ===
            (function G0() {
              return A.lFrame.elementDepthCount
            })() && Pe(u, i),
          (function q0() {
            A.lFrame.elementDepthCount++
          })(),
          ao(l) &&
            (pu(o, i, l),
            (function ih(e, t, n) {
              if (ia(t)) {
                const i = t.directiveEnd
                for (let o = t.directiveStart; o < i; o++) {
                  const s = e.data[o]
                  s.contentQueries && s.contentQueries(1, n[o], o)
                }
              }
            })(o, l, i)),
          null !== r && gu(i, l),
          _
        )
      }
      function E() {
        let e = ve()
        pa()
          ? (function ga() {
              A.lFrame.isParent = !1
            })()
          : ((e = e.parent), xt(e, !1))
        const t = e
        !(function W0() {
          A.lFrame.elementDepthCount--
        })()
        const n = z()
        return (
          n.firstCreatePass && (po(n, e), ia(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function cD(e) {
              return 0 != (16 & e.flags)
            })(t) &&
            Lu(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function dD(e) {
              return 0 != (32 & e.flags)
            })(t) &&
            Lu(n, t, y(), t.stylesWithoutHost, !1),
          E
        )
      }
      function H(e, t, n, r) {
        return _(e, t, n, r), E(), H
      }
      function zo(e) {
        return !!e && 'function' == typeof e.then
      }
      const cp = function lp(e) {
        return !!e && 'function' == typeof e.subscribe
      }
      function kt(e, t, n, r) {
        const i = y(),
          o = z(),
          s = ve()
        return (
          (function fp(e, t, n, r, i, o, s, a) {
            const u = ao(r),
              c = e.firstCreatePass && Dh(e),
              d = t[8],
              f = vh(t)
            let h = !0
            if (3 & r.type || a) {
              const v = ot(r, t),
                D = a ? a(v) : v,
                g = f.length,
                b = a ? (L) => a(he(L[r.index])) : r.index
              if (ue(n)) {
                let L = null
                if (
                  (!a &&
                    u &&
                    (L = (function Jw(e, t, n, r) {
                      const i = e.cleanup
                      if (null != i)
                        for (let o = 0; o < i.length - 1; o += 2) {
                          const s = i[o]
                          if (s === n && i[o + 1] === r) {
                            const a = t[7],
                              u = i[o + 2]
                            return a.length > u ? a[u] : null
                          }
                          'string' == typeof s && (o += 2)
                        }
                      return null
                    })(e, t, i, r.index)),
                  null !== L)
                )
                  ((L.__ngLastListenerFn__ || L).__ngNextListenerFn__ = o),
                    (L.__ngLastListenerFn__ = o),
                    (h = !1)
                else {
                  o = Bu(r, t, d, o, !1)
                  const q = n.listen(D, i, o)
                  f.push(o, q), c && c.push(i, b, g, g + 1)
                }
              } else
                (o = Bu(r, t, d, o, !0)),
                  D.addEventListener(i, o, s),
                  f.push(o),
                  c && c.push(i, b, g, s)
            } else o = Bu(r, t, d, o, !1)
            const p = r.outputs
            let m
            if (h && null !== p && (m = p[i])) {
              const v = m.length
              if (v)
                for (let D = 0; D < v; D += 2) {
                  const et = t[m[D]][m[D + 1]].subscribe(o),
                    Gn = f.length
                  f.push(o, et), c && c.push(i, r.index, Gn, -(Gn + 1))
                }
            }
          })(o, i, i[N], s, e, t, !!n, r),
          kt
        )
      }
      function hp(e, t, n, r) {
        try {
          return !1 !== n(r)
        } catch (i) {
          return Ch(e, i), !1
        }
      }
      function Bu(e, t, n, r, i) {
        return function o(s) {
          if (s === Function) return r
          const a = 2 & e.flags ? Ze(e.index, t) : t
          0 == (32 & t[2]) && Du(a)
          let u = hp(t, 0, r, s),
            l = o.__ngNextListenerFn__
          for (; l; ) (u = hp(t, 0, l, s) && u), (l = l.__ngNextListenerFn__)
          return i && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u
        }
      }
      function G(e, t = '') {
        const n = y(),
          r = z(),
          i = e + 20,
          o = r.firstCreatePass ? dr(r, i, 1, t, null) : r.data[i],
          s = (n[i] = (function Za(e, t) {
            return ue(e) ? e.createText(t) : e.createTextNode(t)
          })(n[N], t))
        Oo(r, n, s, o), xt(o, !1)
      }
      function qo(e, t, n) {
        const r = y(),
          i = (function vr(e, t, n, r) {
            return Oe(e, Jn(), n) ? t + R(n) + r : P
          })(r, e, t, n)
        return i !== P && Yt(r, ke(), i), qo
      }
      const Wo = 'en-US'
      let sg = Wo
      class Rg {}
      class $E {
        resolveComponentFactory(t) {
          throw (function UE(e) {
            const t = Error(
              `No component factory found for ${Q(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            )
            return (t.ngComponent = e), t
          })(t)
        }
      }
      let Si = (() => {
        class e {}
        return (e.NULL = new $E()), e
      })()
      function zE() {
        return xr(ve(), y())
      }
      function xr(e, t) {
        return new yn(ot(e, t))
      }
      let yn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n
          }
        }
        return (e.__NG_ELEMENT_ID__ = zE), e
      })()
      class Og {}
      let ZE = (() => {
        class e {}
        return (
          (e.ɵprov = $({ token: e, providedIn: 'root', factory: () => null })),
          e
        )
      })()
      class Xo {
        constructor(t) {
          ;(this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'))
        }
      }
      const QE = new Xo('13.2.7'),
        Qu = {}
      function es(e, t, n, r, i = !1) {
        for (; null !== n; ) {
          const o = t[n.index]
          if ((null !== o && r.push(he(o)), pt(o)))
            for (let a = 10; a < o.length; a++) {
              const u = o[a],
                l = u[1].firstChild
              null !== l && es(u[1], u, l, r)
            }
          const s = n.type
          if (8 & s) es(e, t, n.child, r)
          else if (32 & s) {
            const a = Ga(n, t)
            let u
            for (; (u = a()); ) r.push(u)
          } else if (16 & s) {
            const a = kf(t, n)
            if (Array.isArray(a)) r.push(...a)
            else {
              const u = gi(t[16])
              es(u[1], u, a, r, !0)
            }
          }
          n = i ? n.projectionNext : n.next
        }
        return r
      }
      class Ti {
        constructor(t, n) {
          ;(this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1)
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1]
          return es(n, t, n.firstChild, [])
        }
        get context() {
          return this._lView[8]
        }
        set context(t) {
          this._lView[8] = t
        }
        get destroyed() {
          return 256 == (256 & this._lView[2])
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this)
          else if (this._attachedToViewContainer) {
            const t = this._lView[3]
            if (pt(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1
              r > -1 && (Ya(t, r), Eo(n, r))
            }
            this._attachedToViewContainer = !1
          }
          Sf(this._lView[1], this._lView)
        }
        onDestroy(t) {
          !(function uh(e, t, n, r) {
            const i = vh(t)
            null === n
              ? i.push(r)
              : (i.push(n), e.firstCreatePass && Dh(e).push(r, i.length - 1))
          })(this._lView[1], this._lView, null, t)
        }
        markForCheck() {
          Du(this._cdRefInjectingView || this._lView)
        }
        detach() {
          this._lView[2] &= -129
        }
        reattach() {
          this._lView[2] |= 128
        }
        detectChanges() {
          Cu(this._lView[1], this._lView, this.context)
        }
        checkNoChanges() {
          !(function YC(e, t, n) {
            co(!0)
            try {
              Cu(e, t, n)
            } finally {
              co(!1)
            }
          })(this._lView[1], this._lView, this.context)
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new Z(902, '')
          this._attachedToViewContainer = !0
        }
        detachFromAppRef() {
          ;(this._appRef = null),
            (function q_(e, t) {
              mi(e, t, t[N], 2, null, null)
            })(this._lView[1], this._lView)
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new Z(902, '')
          this._appRef = t
        }
      }
      class YE extends Ti {
        constructor(t) {
          super(t), (this._view = t)
        }
        detectChanges() {
          yh(this._view)
        }
        checkNoChanges() {
          !(function KC(e) {
            co(!0)
            try {
              yh(e)
            } finally {
              co(!1)
            }
          })(this._view)
        }
        get context() {
          return null
        }
      }
      class Ng extends Si {
        constructor(t) {
          super(), (this.ngModule = t)
        }
        resolveComponentFactory(t) {
          const n = xe(t)
          return new Yu(n, this.ngModule)
        }
      }
      function Fg(e) {
        const t = []
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n })
        return t
      }
      class Yu extends Rg {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function fC(e) {
              return e.map(dC).join(',')
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n)
        }
        get inputs() {
          return Fg(this.componentDef.inputs)
        }
        get outputs() {
          return Fg(this.componentDef.outputs)
        }
        create(t, n, r, i) {
          const o = (i = i || this.ngModule)
              ? (function JE(e, t) {
                  return {
                    get: (n, r, i) => {
                      const o = e.get(n, Qu, i)
                      return o !== Qu || r === Qu ? o : t.get(n, r, i)
                    },
                  }
                })(t, i.injector)
              : t,
            s = o.get(Og, yd),
            a = o.get(ZE, null),
            u = s.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || 'div',
            c = r
              ? (function ah(e, t, n) {
                  if (ue(e)) return e.selectRootElement(t, n === Tt.ShadowDom)
                  let r = 'string' == typeof t ? e.querySelector(t) : t
                  return (r.textContent = ''), r
                })(u, r, this.componentDef.encapsulation)
              : Qa(
                  s.createRenderer(null, this.componentDef),
                  l,
                  (function KE(e) {
                    const t = e.toLowerCase()
                    return 'svg' === t ? 'svg' : 'math' === t ? 'math' : null
                  })(l)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function Vh(e, t) {
              return {
                components: [],
                scheduler: e || j_,
                clean: JC,
                playerHandler: t || null,
                flags: 0,
              }
            })(),
            h = jo(0, null, null, 1, 0, null, null, null, null, null),
            p = yi(null, h, f, d, null, null, s, u, a, o)
          let m, v
          fo(p)
          try {
            const D = (function Lh(e, t, n, r, i, o) {
              const s = n[1]
              n[20] = e
              const u = dr(s, 20, 2, '#host', null),
                l = (u.mergedAttrs = t.hostAttrs)
              null !== l &&
                (Bo(u, l, !0),
                null !== e &&
                  (yo(i, e, l),
                  null !== u.classes && tu(i, e, u.classes),
                  null !== u.styles && Vf(i, e, u.styles)))
              const c = r.createRenderer(e, t),
                d = yi(
                  n,
                  oh(t),
                  null,
                  t.onPush ? 64 : 16,
                  n[20],
                  u,
                  r,
                  c,
                  o || null,
                  null
                )
              return (
                s.firstCreatePass &&
                  (Co(Xr(u, n), s, t.type), hh(s, u), ph(u, n.length, 1)),
                Vo(n, d),
                (n[20] = d)
              )
            })(c, this.componentDef, p, s, u)
            if (c)
              if (r) yo(u, c, ['ng-version', QE.full])
              else {
                const { attrs: g, classes: b } = (function hC(e) {
                  const t = [],
                    n = []
                  let r = 1,
                    i = 2
                  for (; r < e.length; ) {
                    let o = e[r]
                    if ('string' == typeof o)
                      2 === i
                        ? '' !== o && t.push(o, e[++r])
                        : 8 === i && n.push(o)
                    else {
                      if (!mt(i)) break
                      i = o
                    }
                    r++
                  }
                  return { attrs: t, classes: n }
                })(this.componentDef.selectors[0])
                g && yo(u, c, g), b && b.length > 0 && tu(u, c, b.join(' '))
              }
            if (((v = da(h, 20)), void 0 !== n)) {
              const g = (v.projection = [])
              for (let b = 0; b < this.ngContentSelectors.length; b++) {
                const L = n[b]
                g.push(null != L ? Array.from(L) : null)
              }
            }
            ;(m = (function jh(e, t, n, r, i) {
              const o = n[1],
                s = (function NC(e, t, n) {
                  const r = ve()
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    gh(e, r, t, fr(e, t, 1, null), n))
                  const i = ei(t, e, r.directiveStart, r)
                  Pe(i, t)
                  const o = ot(r, t)
                  return o && Pe(o, t), i
                })(o, n, t)
              if (
                (r.components.push(s),
                (e[8] = s),
                i && i.forEach((u) => u(s, t)),
                t.contentQueries)
              ) {
                const u = ve()
                t.contentQueries(1, s, u.directiveStart)
              }
              const a = ve()
              return (
                !o.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (un(a.index),
                  dh(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  fh(t, s)),
                s
              )
            })(D, this.componentDef, p, f, [vw])),
              vi(h, p, null)
          } finally {
            ho()
          }
          return new eb(this.componentType, m, xr(v, p), p, v)
        }
      }
      class eb extends class HE {} {
        constructor(t, n, r, i, o) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = o),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new YE(i)),
            (this.componentType = t)
        }
        get injector() {
          return new tr(this._tNode, this._rootLView)
        }
        destroy() {
          this.hostView.destroy()
        }
        onDestroy(t) {
          this.hostView.onDestroy(t)
        }
      }
      class Kt {}
      class kg {}
      const Rr = new Map()
      class Vg extends Kt {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ng(this))
          const r = nt(t)
          ;(this._bootstrapComponents = Ot(r.bootstrap)),
            (this._r3Injector = Ih(
              t,
              n,
              [
                { provide: Kt, useValue: this },
                { provide: Si, useValue: this.componentFactoryResolver },
              ],
              Q(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t))
        }
        get(t, n = $e.THROW_IF_NOT_FOUND, r = x.Default) {
          return t === $e || t === Kt || t === Eu
            ? this
            : this._r3Injector.get(t, n, r)
        }
        destroy() {
          const t = this._r3Injector
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null)
        }
        onDestroy(t) {
          this.destroyCbs.push(t)
        }
      }
      class Ku extends kg {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== nt(t) &&
              (function nb(e) {
                const t = new Set()
                !(function n(r) {
                  const i = nt(r, !0),
                    o = i.id
                  null !== o &&
                    ((function Lg(e, t, n) {
                      if (t && t !== n)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${Q(
                            t
                          )} vs ${Q(t.name)}`
                        )
                    })(o, Rr.get(o), r),
                    Rr.set(o, r))
                  const s = Ot(i.imports)
                  for (const a of s) t.has(a) || (t.add(a), n(a))
                })(e)
              })(t)
        }
        create(t) {
          return new Vg(this.moduleType, t)
        }
      }
      function Ju(e) {
        return (t) => {
          setTimeout(e, void 0, t)
        }
      }
      const Ve = class _b extends Ht {
        constructor(t = !1) {
          super(), (this.__isAsync = t)
        }
        emit(t) {
          super.next(t)
        }
        subscribe(t, n, r) {
          var i, o, s
          let a = t,
            u = n || (() => null),
            l = r
          if (t && 'object' == typeof t) {
            const d = t
            ;(a = null === (i = d.next) || void 0 === i ? void 0 : i.bind(d)),
              (u = null === (o = d.error) || void 0 === o ? void 0 : o.bind(d)),
              (l =
                null === (s = d.complete) || void 0 === s ? void 0 : s.bind(d))
          }
          this.__isAsync && ((u = Ju(u)), a && (a = Ju(a)), l && (l = Ju(l)))
          const c = super.subscribe({ next: a, error: u, complete: l })
          return t instanceof tt && t.add(c), c
        }
      }
      Symbol
      let Jt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = bb), e
      })()
      const wb = Jt,
        Eb = class extends wb {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r)
          }
          createEmbeddedView(t) {
            const n = this._declarationTContainer.tViews,
              r = yi(
                this._declarationLView,
                n,
                t,
                16,
                null,
                n.declTNode,
                null,
                null,
                null,
                null
              )
            r[17] = this._declarationLView[this._declarationTContainer.index]
            const o = this._declarationLView[19]
            return (
              null !== o && (r[19] = o.createEmbeddedView(n)),
              vi(n, r, t),
              new Ti(r)
            )
          }
        }
      function bb() {
        return (function ts(e, t) {
          return 4 & e.type ? new Eb(t, e, xr(e, t)) : null
        })(ve(), y())
      }
      let Ct = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = Mb), e
      })()
      function Mb() {
        return (function Wg(e, t) {
          let n
          const r = t[e.index]
          if (pt(r)) n = r
          else {
            let i
            if (8 & e.type) i = he(r)
            else {
              const o = t[N]
              i = o.createComment('')
              const s = ot(e, t)
              Nn(
                o,
                Po(o, s),
                i,
                (function X_(e, t) {
                  return ue(e) ? e.nextSibling(t) : t.nextSibling
                })(o, s),
                !1
              )
            }
            ;(t[e.index] = n = mh(r, t, i, e)), Vo(t, n)
          }
          return new Gg(n, e, t)
        })(ve(), y())
      }
      const Ib = Ct,
        Gg = class extends Ib {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r)
          }
          get element() {
            return xr(this._hostTNode, this._hostLView)
          }
          get injector() {
            return new tr(this._hostTNode, this._hostLView)
          }
          get parentInjector() {
            const t = _o(this._hostTNode, this._hostLView)
            if (Od(t)) {
              const n = er(t, this._hostLView),
                r = Xn(t)
              return new tr(n[1].data[r + 8], n)
            }
            return new tr(null, this._hostLView)
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1)
          }
          get(t) {
            const n = qg(this._lContainer)
            return (null !== n && n[t]) || null
          }
          get length() {
            return this._lContainer.length - 10
          }
          createEmbeddedView(t, n, r) {
            const i = t.createEmbeddedView(n || {})
            return this.insert(i, r), i
          }
          createComponent(t, n, r, i, o) {
            const s =
              t &&
              !(function ri(e) {
                return 'function' == typeof e
              })(t)
            let a
            if (s) a = n
            else {
              const d = n || {}
              ;(a = d.index),
                (r = d.injector),
                (i = d.projectableNodes),
                (o = d.ngModuleRef)
            }
            const u = s ? t : new Yu(xe(t)),
              l = r || this.parentInjector
            if (!o && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(Kt, null)
              f && (o = f)
            }
            const c = u.create(l, i, void 0, o)
            return this.insert(c.hostView, a), c
          }
          insert(t, n) {
            const r = t._lView,
              i = r[1]
            if (
              (function z0(e) {
                return pt(e[3])
              })(r)
            ) {
              const c = this.indexOf(t)
              if (-1 !== c) this.detach(c)
              else {
                const d = r[3],
                  f = new Gg(d, d[6], d[3])
                f.detach(f.indexOf(t))
              }
            }
            const o = this._adjustIndex(n),
              s = this._lContainer
            !(function Z_(e, t, n, r) {
              const i = 10 + r,
                o = n.length
              r > 0 && (n[i - 1][4] = t),
                r < o - 10
                  ? ((t[4] = n[i]), $d(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n)
              const s = t[17]
              null !== s &&
                n !== s &&
                (function Q_(e, t) {
                  const n = e[9]
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t)
                })(s, t)
              const a = t[19]
              null !== a && a.insertView(e), (t[2] |= 128)
            })(i, r, s, o)
            const a = Xa(o, s),
              u = r[N],
              l = Po(u, s[7])
            return (
              null !== l &&
                (function G_(e, t, n, r, i, o) {
                  ;(r[0] = i), (r[6] = t), mi(e, r, n, 1, i, o)
                })(i, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              $d(el(s), o, t),
              t
            )
          }
          move(t, n) {
            return this.insert(t, n)
          }
          indexOf(t) {
            const n = qg(this._lContainer)
            return null !== n ? n.indexOf(t) : -1
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Ya(this._lContainer, n)
            r && (Eo(el(this._lContainer), n), Sf(r[1], r))
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Ya(this._lContainer, n)
            return r && null != Eo(el(this._lContainer), n) ? new Ti(r) : null
          }
          _adjustIndex(t, n = 0) {
            return null == t ? this.length + n : t
          }
        }
      function qg(e) {
        return e[8]
      }
      function el(e) {
        return e[8] || (e[8] = [])
      }
      function is(...e) {}
      const pl = new W('Application Initializer')
      let gl = (() => {
        class e {
          constructor(n) {
            ;(this.appInits = n),
              (this.resolve = is),
              (this.reject = is),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                ;(this.resolve = r), (this.reject = i)
              }))
          }
          runInitializers() {
            if (this.initialized) return
            const n = [],
              r = () => {
                ;(this.done = !0), this.resolve()
              }
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const o = this.appInits[i]()
                if (zo(o)) n.push(o)
                else if (cp(o)) {
                  const s = new Promise((a, u) => {
                    o.subscribe({ complete: a, error: u })
                  })
                  n.push(s)
                }
              }
            Promise.all(n)
              .then(() => {
                r()
              })
              .catch((i) => {
                this.reject(i)
              }),
              0 === n.length && r(),
              (this.initialized = !0)
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(pl, 8))
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        )
      })()
      const Pi = new W('AppId', {
        providedIn: 'root',
        factory: function gm() {
          return `${ml()}${ml()}${ml()}`
        },
      })
      function ml() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()))
      }
      const mm = new W('Platform Initializer'),
        yl = new W('Platform ID'),
        ym = new W('appBootstrapListener')
      let vm = (() => {
        class e {
          log(n) {
            console.log(n)
          }
          warn(n) {
            console.warn(n)
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)()
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      const vn = new W('LocaleId', {
        providedIn: 'root',
        factory: () =>
          FD(vn, x.Optional | x.SkipSelf) ||
          (function Xb() {
            return ('undefined' != typeof $localize && $localize.locale) || Wo
          })(),
      })
      class tM {
        constructor(t, n) {
          ;(this.ngModuleFactory = t), (this.componentFactories = n)
        }
      }
      let Dm = (() => {
        class e {
          compileModuleSync(n) {
            return new Ku(n)
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n))
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              o = Ot(nt(n).declarations).reduce((s, a) => {
                const u = xe(a)
                return u && s.push(new Yu(u)), s
              }, [])
            return new tM(r, o)
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)()
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        )
      })()
      const rM = (() => Promise.resolve(0))()
      function vl(e) {
        'undefined' == typeof Zone
          ? rM.then(() => {
              e && e.apply(null, null)
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', e)
      }
      class Ie {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ve(!1)),
            (this.onMicrotaskEmpty = new Ve(!1)),
            (this.onStable = new Ve(!1)),
            (this.onError = new Ve(!1)),
            'undefined' == typeof Zone)
          )
            throw new Error('In this configuration Angular requires Zone.js')
          Zone.assertZonePatched()
          const i = this
          ;(i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function iM() {
              let e = Y.requestAnimationFrame,
                t = Y.cancelAnimationFrame
              if ('undefined' != typeof Zone && e && t) {
                const n = e[Zone.__symbol__('OriginalDelegate')]
                n && (e = n)
                const r = t[Zone.__symbol__('OriginalDelegate')]
                r && (t = r)
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              }
            })().nativeRequestAnimationFrame),
            (function aM(e) {
              const t = () => {
                !(function sM(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(Y, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              ;(e.lastRequestAnimationFrameId = -1),
                                _l(e),
                                (e.isCheckStableRunning = !0),
                                Dl(e),
                                (e.isCheckStableRunning = !1)
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke()
                      })),
                    _l(e))
                })(e)
              }
              e._inner = e._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, o, s, a) => {
                  try {
                    return _m(e), n.invokeTask(i, o, s, a)
                  } finally {
                    ;((e.shouldCoalesceEventChangeDetection &&
                      'eventTask' === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Cm(e)
                  }
                },
                onInvoke: (n, r, i, o, s, a, u) => {
                  try {
                    return _m(e), n.invoke(i, o, s, a, u)
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Cm(e)
                  }
                },
                onHasTask: (n, r, i, o) => {
                  n.hasTask(i, o),
                    r === i &&
                      ('microTask' == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          _l(e),
                          Dl(e))
                        : 'macroTask' == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask))
                },
                onHandleError: (n, r, i, o) => (
                  n.handleError(i, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              })
            })(i)
        }
        static isInAngularZone() {
          return (
            'undefined' != typeof Zone &&
            !0 === Zone.current.get('isAngularZone')
          )
        }
        static assertInAngularZone() {
          if (!Ie.isInAngularZone())
            throw new Error('Expected to be in Angular Zone, but it is not!')
        }
        static assertNotInAngularZone() {
          if (Ie.isInAngularZone())
            throw new Error('Expected to not be in Angular Zone, but it is!')
        }
        run(t, n, r) {
          return this._inner.run(t, n, r)
        }
        runTask(t, n, r, i) {
          const o = this._inner,
            s = o.scheduleEventTask('NgZoneEvent: ' + i, t, oM, is, is)
          try {
            return o.runTask(s, n, r)
          } finally {
            o.cancelTask(s)
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r)
        }
        runOutsideAngular(t) {
          return this._outer.run(t)
        }
      }
      const oM = {}
      function Dl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null)
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null))
              } finally {
                e.isStable = !0
              }
          }
      }
      function _l(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        )
      }
      function _m(e) {
        e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null))
      }
      function Cm(e) {
        e._nesting--, Dl(e)
      }
      class uM {
        constructor() {
          ;(this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ve()),
            (this.onMicrotaskEmpty = new Ve()),
            (this.onStable = new Ve()),
            (this.onError = new Ve())
        }
        run(t, n, r) {
          return t.apply(n, r)
        }
        runGuarded(t, n, r) {
          return t.apply(n, r)
        }
        runOutsideAngular(t) {
          return t()
        }
        runTask(t, n, r, i) {
          return t.apply(n, r)
        }
      }
      let Cl = (() => {
          class e {
            constructor(n) {
              ;(this._ngZone = n),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    'undefined' == typeof Zone
                      ? null
                      : Zone.current.get('TaskTrackingZone')
                })
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  ;(this._didWork = !0), (this._isZoneStable = !1)
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ie.assertNotInAngularZone(),
                        vl(() => {
                          ;(this._isZoneStable = !0),
                            this._runCallbacksIfReady()
                        })
                    },
                  })
                })
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              )
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero')
              return this._runCallbacksIfReady(), this._pendingCount
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              )
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                vl(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop()
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork)
                  }
                  this._didWork = !1
                })
              else {
                let n = this.getPendingTasks()
                ;(this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0)
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : []
            }
            addCallback(n, r, i) {
              let o = -1
              r &&
                r > 0 &&
                (o = setTimeout(() => {
                  ;(this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    n(this._didWork, this.getPendingTasks())
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: i })
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                )
              this.addCallback(n, r, i), this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
              return this._pendingCount
            }
            findProviders(n, r, i) {
              return []
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S(Ie))
            }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac })),
            e
          )
        })(),
        wm = (() => {
          class e {
            constructor() {
              ;(this._applications = new Map()), wl.addToWindow(this)
            }
            registerApplication(n, r) {
              this._applications.set(n, r)
            }
            unregisterApplication(n) {
              this._applications.delete(n)
            }
            unregisterAllApplications() {
              this._applications.clear()
            }
            getTestability(n) {
              return this._applications.get(n) || null
            }
            getAllTestabilities() {
              return Array.from(this._applications.values())
            }
            getAllRootElements() {
              return Array.from(this._applications.keys())
            }
            findTestabilityInTree(n, r = !0) {
              return wl.findTestabilityInTree(this, n, r)
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac })),
            e
          )
        })()
      class lM {
        addToWindow(t) {}
        findTestabilityInTree(t, n, r) {
          return null
        }
      }
      let wt,
        wl = new lM()
      const Em = new W('AllowMultipleToken')
      class bm {
        constructor(t, n) {
          ;(this.name = t), (this.token = n)
        }
      }
      function Mm(e, t, n = []) {
        const r = `Platform: ${t}`,
          i = new W(r)
        return (o = []) => {
          let s = Im()
          if (!s || s.injector.get(Em, !1))
            if (e) e(n.concat(o).concat({ provide: i, useValue: !0 }))
            else {
              const a = n
                .concat(o)
                .concat(
                  { provide: i, useValue: !0 },
                  { provide: bu, useValue: 'platform' }
                )
              !(function hM(e) {
                if (wt && !wt.destroyed && !wt.injector.get(Em, !1))
                  throw new Z(400, '')
                wt = e.get(Sm)
                const t = e.get(mm, null)
                t && t.forEach((n) => n())
              })($e.create({ providers: a, name: r }))
            }
          return (function pM(e) {
            const t = Im()
            if (!t) throw new Z(401, '')
            return t
          })()
        }
      }
      function Im() {
        return wt && !wt.destroyed ? wt : null
      }
      let Sm = (() => {
        class e {
          constructor(n) {
            ;(this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1)
          }
          bootstrapModuleFactory(n, r) {
            const a = (function gM(e, t) {
                let n
                return (
                  (n =
                    'noop' === e
                      ? new uM()
                      : ('zone.js' === e ? void 0 : e) ||
                        new Ie({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneRunCoalescing),
                        })),
                  n
                )
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              u = [{ provide: Ie, useValue: a }]
            return a.run(() => {
              const l = $e.create({
                  providers: u,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(l),
                d = c.injector.get(pi, null)
              if (!d) throw new Z(402, '')
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h)
                    },
                  })
                  c.onDestroy(() => {
                    bl(this._modules, c), f.unsubscribe()
                  })
                }),
                (function mM(e, t, n) {
                  try {
                    const r = n()
                    return zo(r)
                      ? r.catch((i) => {
                          throw (t.runOutsideAngular(() => e.handleError(i)), i)
                        })
                      : r
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r)
                  }
                })(d, a, () => {
                  const f = c.injector.get(gl)
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function G1(e) {
                          qe(e, 'Expected localeId to be defined'),
                            'string' == typeof e &&
                              (sg = e.toLowerCase().replace(/_/g, '-'))
                        })(c.injector.get(vn, Wo) || Wo),
                        this._moduleDoBootstrap(c),
                        c
                      )
                    )
                  )
                })
              )
            })
          }
          bootstrapModule(n, r = []) {
            const i = Tm({}, r)
            return (function dM(e, t, n) {
              const r = new Ku(n)
              return Promise.resolve(r)
            })(0, 0, n).then((o) => this.bootstrapModuleFactory(o, i))
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(El)
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i))
            else {
              if (!n.instance.ngDoBootstrap) throw new Z(403, '')
              n.instance.ngDoBootstrap(r)
            }
            this._modules.push(n)
          }
          onDestroy(n) {
            this._destroyListeners.push(n)
          }
          get injector() {
            return this._injector
          }
          destroy() {
            if (this._destroyed) throw new Z(404, '')
            this._modules.slice().forEach((n) => n.destroy()),
              this._destroyListeners.forEach((n) => n()),
              (this._destroyed = !0)
          }
          get destroyed() {
            return this._destroyed
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S($e))
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      function Tm(e, t) {
        return Array.isArray(t)
          ? t.reduce(Tm, e)
          : Object.assign(Object.assign({}, e), t)
      }
      let El = (() => {
        class e {
          constructor(n, r, i, o, s) {
            ;(this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._componentFactoryResolver = o),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick()
                    })
                  },
                }))
            const a = new ye((l) => {
                ;(this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    l.next(this._stable), l.complete()
                  })
              }),
              u = new ye((l) => {
                let c
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    Ie.assertNotInAngularZone(),
                      vl(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), l.next(!0))
                      })
                  })
                })
                const d = this._zone.onUnstable.subscribe(() => {
                  Ie.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        l.next(!1)
                      }))
                })
                return () => {
                  c.unsubscribe(), d.unsubscribe()
                }
              })
            this.isStable = (function l0(...e) {
              const t = zr(e),
                n = (function t0(e, t) {
                  return 'number' == typeof Gs(e) ? e.pop() : t
                })(e, 1 / 0),
                r = e
              return r.length
                ? 1 === r.length
                  ? It(r[0])
                  : $r(n)(Te(r, t))
                : $t
            })(
              a,
              u.pipe(
                (function c0(e = {}) {
                  const {
                    connector: t = () => new Ht(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: i = !0,
                  } = e
                  return (o) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1
                    const f = () => {
                        null == a || a.unsubscribe(), (a = void 0)
                      },
                      h = () => {
                        f(), (s = u = void 0), (c = d = !1)
                      },
                      p = () => {
                        const m = s
                        h(), null == m || m.unsubscribe()
                      }
                    return be((m, v) => {
                      l++, !d && !c && f()
                      const D = (u = null != u ? u : t())
                      v.add(() => {
                        l--, 0 === l && !d && !c && (a = qs(p, i))
                      }),
                        D.subscribe(v),
                        !s &&
                          l > 0 &&
                          ((s = new Ur({
                            next: (g) => D.next(g),
                            error: (g) => {
                              ;(d = !0), f(), (a = qs(h, n, g)), D.error(g)
                            },
                            complete: () => {
                              ;(c = !0), f(), (a = qs(h, r)), D.complete()
                            },
                          })),
                          It(m).subscribe(s))
                    })(o)
                  }
                })()
              )
            )
          }
          bootstrap(n, r) {
            if (!this._initStatus.done) throw new Z(405, '')
            let i
            ;(i =
              n instanceof Rg
                ? n
                : this._componentFactoryResolver.resolveComponentFactory(n)),
              this.componentTypes.push(i.componentType)
            const o = (function fM(e) {
                return e.isBoundToModule
              })(i)
                ? void 0
                : this._injector.get(Kt),
              a = i.create($e.NULL, [], r || i.selector, o),
              u = a.location.nativeElement,
              l = a.injector.get(Cl, null),
              c = l && a.injector.get(wm)
            return (
              l && c && c.registerApplication(u, l),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  bl(this.components, a),
                  c && c.unregisterApplication(u)
              }),
              this._loadComponent(a),
              a
            )
          }
          tick() {
            if (this._runningTick) throw new Z(101, '')
            try {
              this._runningTick = !0
              for (let n of this._views) n.detectChanges()
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              )
            } finally {
              this._runningTick = !1
            }
          }
          attachView(n) {
            const r = n
            this._views.push(r), r.attachToAppRef(this)
          }
          detachView(n) {
            const r = n
            bl(this._views, r), r.detachFromAppRef()
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(ym, [])
                .concat(this._bootstrapListeners)
                .forEach((i) => i(n))
          }
          ngOnDestroy() {
            this._views.slice().forEach((n) => n.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe()
          }
          get viewCount() {
            return this._views.length
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(Ie), S($e), S(pi), S(Si), S(gl))
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        )
      })()
      function bl(e, t) {
        const n = e.indexOf(t)
        n > -1 && e.splice(n, 1)
      }
      let xm = !0,
        Ml = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = DM), e
        })()
      function DM(e) {
        return (function _M(e, t, n) {
          if (so(e) && !n) {
            const r = Ze(e.index, t)
            return new Ti(r, r)
          }
          return 47 & e.type ? new Ti(t[16], t) : null
        })(ve(), y(), 16 == (16 & e))
      }
      const OM = Mm(null, 'core', [
        { provide: yl, useValue: 'unknown' },
        { provide: Sm, deps: [$e] },
        { provide: wm, deps: [] },
        { provide: vm, deps: [] },
      ])
      let NM = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S(El))
            }),
            (e.ɵmod = qt({ type: e })),
            (e.ɵinj = St({})),
            e
          )
        })(),
        us = null
      function Dn() {
        return us
      }
      const ut = new W('DocumentToken')
      let Vn = (() => {
        class e {
          historyGo(n) {
            throw new Error('Not implemented')
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)()
          }),
          (e.ɵprov = $({
            token: e,
            factory: function () {
              return (function jM() {
                return S(Hm)
              })()
            },
            providedIn: 'platform',
          })),
          e
        )
      })()
      const VM = new W('Location Initialized')
      let Hm = (() => {
        class e extends Vn {
          constructor(n) {
            super(), (this._doc = n), this._init()
          }
          _init() {
            ;(this.location = window.location), (this._history = window.history)
          }
          getBaseHrefFromDOM() {
            return Dn().getBaseHref(this._doc)
          }
          onPopState(n) {
            const r = Dn().getGlobalEventTarget(this._doc, 'window')
            return (
              r.addEventListener('popstate', n, !1),
              () => r.removeEventListener('popstate', n)
            )
          }
          onHashChange(n) {
            const r = Dn().getGlobalEventTarget(this._doc, 'window')
            return (
              r.addEventListener('hashchange', n, !1),
              () => r.removeEventListener('hashchange', n)
            )
          }
          get href() {
            return this.location.href
          }
          get protocol() {
            return this.location.protocol
          }
          get hostname() {
            return this.location.hostname
          }
          get port() {
            return this.location.port
          }
          get pathname() {
            return this.location.pathname
          }
          get search() {
            return this.location.search
          }
          get hash() {
            return this.location.hash
          }
          set pathname(n) {
            this.location.pathname = n
          }
          pushState(n, r, i) {
            Um() ? this._history.pushState(n, r, i) : (this.location.hash = i)
          }
          replaceState(n, r, i) {
            Um()
              ? this._history.replaceState(n, r, i)
              : (this.location.hash = i)
          }
          forward() {
            this._history.forward()
          }
          back() {
            this._history.back()
          }
          historyGo(n = 0) {
            this._history.go(n)
          }
          getState() {
            return this._history.state
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(ut))
          }),
          (e.ɵprov = $({
            token: e,
            factory: function () {
              return (function BM() {
                return new Hm(S(ut))
              })()
            },
            providedIn: 'platform',
          })),
          e
        )
      })()
      function Um() {
        return !!window.history.pushState
      }
      function xl(e, t) {
        if (0 == e.length) return t
        if (0 == t.length) return e
        let n = 0
        return (
          e.endsWith('/') && n++,
          t.startsWith('/') && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + '/' + t
        )
      }
      function $m(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length
        return e.slice(0, n - ('/' === e[n - 1] ? 1 : 0)) + e.slice(n)
      }
      function Xt(e) {
        return e && '?' !== e[0] ? '?' + e : e
      }
      let Or = (() => {
        class e {
          historyGo(n) {
            throw new Error('Not implemented')
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)()
          }),
          (e.ɵprov = $({
            token: e,
            factory: function () {
              return (function HM(e) {
                const t = S(ut).location
                return new zm(S(Vn), (t && t.origin) || '')
              })()
            },
            providedIn: 'root',
          })),
          e
        )
      })()
      const Rl = new W('appBaseHref')
      let zm = (() => {
          class e extends Or {
            constructor(n, r) {
              if (
                (super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                null == r && (r = this._platformLocation.getBaseHrefFromDOM()),
                null == r)
              )
                throw new Error(
                  'No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.'
                )
              this._baseHref = r
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()()
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              )
            }
            getBaseHref() {
              return this._baseHref
            }
            prepareExternalUrl(n) {
              return xl(this._baseHref, n)
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Xt(this._platformLocation.search),
                i = this._platformLocation.hash
              return i && n ? `${r}${i}` : r
            }
            pushState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + Xt(o))
              this._platformLocation.pushState(n, r, s)
            }
            replaceState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + Xt(o))
              this._platformLocation.replaceState(n, r, s)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
            historyGo(n = 0) {
              var r, i
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, n)
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S(Vn), S(Rl, 8))
            }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac })),
            e
          )
        })(),
        UM = (() => {
          class e extends Or {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r)
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()()
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              )
            }
            getBaseHref() {
              return this._baseHref
            }
            path(n = !1) {
              let r = this._platformLocation.hash
              return null == r && (r = '#'), r.length > 0 ? r.substring(1) : r
            }
            prepareExternalUrl(n) {
              const r = xl(this._baseHref, n)
              return r.length > 0 ? '#' + r : r
            }
            pushState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + Xt(o))
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s)
            }
            replaceState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + Xt(o))
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
            historyGo(n = 0) {
              var r, i
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, n)
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S(Vn), S(Rl, 8))
            }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac })),
            e
          )
        })(),
        Pl = (() => {
          class e {
            constructor(n, r) {
              ;(this._subject = new Ve()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = n)
              const i = this._platformStrategy.getBaseHref()
              ;(this._platformLocation = r),
                (this._baseHref = $m(Gm(i))),
                this._platformStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  })
                })
            }
            path(n = !1) {
              return this.normalize(this._platformStrategy.path(n))
            }
            getState() {
              return this._platformLocation.getState()
            }
            isCurrentPathEqualTo(n, r = '') {
              return this.path() == this.normalize(n + Xt(r))
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function zM(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t
                })(this._baseHref, Gm(n))
              )
            }
            prepareExternalUrl(n) {
              return (
                n && '/' !== n[0] && (n = '/' + n),
                this._platformStrategy.prepareExternalUrl(n)
              )
            }
            go(n, r = '', i = null) {
              this._platformStrategy.pushState(i, '', n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Xt(r)),
                  i
                )
            }
            replaceState(n, r = '', i = null) {
              this._platformStrategy.replaceState(i, '', n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Xt(r)),
                  i
                )
            }
            forward() {
              this._platformStrategy.forward()
            }
            back() {
              this._platformStrategy.back()
            }
            historyGo(n = 0) {
              var r, i
              null === (i = (r = this._platformStrategy).historyGo) ||
                void 0 === i ||
                i.call(r, n)
            }
            onUrlChange(n) {
              this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state)
                  }))
            }
            _notifyUrlChangeListeners(n = '', r) {
              this._urlChangeListeners.forEach((i) => i(n, r))
            }
            subscribe(n, r, i) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: i,
              })
            }
          }
          return (
            (e.normalizeQueryParams = Xt),
            (e.joinWithSlash = xl),
            (e.stripTrailingSlash = $m),
            (e.ɵfac = function (n) {
              return new (n || e)(S(Or), S(Vn))
            }),
            (e.ɵprov = $({
              token: e,
              factory: function () {
                return (function $M() {
                  return new Pl(S(Or), S(Vn))
                })()
              },
              providedIn: 'root',
            })),
            e
          )
        })()
      function Gm(e) {
        return e.replace(/\/index.html$/, '')
      }
      class Ul {
        constructor(t, n) {
          ;(this._viewContainerRef = t),
            (this._templateRef = n),
            (this._created = !1)
        }
        create() {
          ;(this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef)
        }
        destroy() {
          ;(this._created = !1), this._viewContainerRef.clear()
        }
        enforceState(t) {
          t && !this._created
            ? this.create()
            : !t && this._created && this.destroy()
        }
      }
      let vs = (() => {
          class e {
            constructor() {
              ;(this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1)
            }
            set ngSwitch(n) {
              ;(this._ngSwitch = n),
                0 === this._caseCount && this._updateDefaultCases(!0)
            }
            _addCase() {
              return this._caseCount++
            }
            _addDefault(n) {
              this._defaultViews || (this._defaultViews = []),
                this._defaultViews.push(n)
            }
            _matchCase(n) {
              const r = n == this._ngSwitch
              return (
                (this._lastCasesMatched = this._lastCasesMatched || r),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                r
              )
            }
            _updateDefaultCases(n) {
              if (this._defaultViews && n !== this._defaultUsed) {
                this._defaultUsed = n
                for (let r = 0; r < this._defaultViews.length; r++)
                  this._defaultViews[r].enforceState(n)
              }
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵdir = Ae({
              type: e,
              selectors: [['', 'ngSwitch', '']],
              inputs: { ngSwitch: 'ngSwitch' },
            })),
            e
          )
        })(),
        ny = (() => {
          class e {
            constructor(n, r, i) {
              ;(this.ngSwitch = i), i._addCase(), (this._view = new Ul(n, r))
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              )
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ct), M(Jt), M(vs, 9))
            }),
            (e.ɵdir = Ae({
              type: e,
              selectors: [['', 'ngSwitchCase', '']],
              inputs: { ngSwitchCase: 'ngSwitchCase' },
            })),
            e
          )
        })(),
        ry = (() => {
          class e {
            constructor(n, r, i) {
              i._addDefault(new Ul(n, r))
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ct), M(Jt), M(vs, 9))
            }),
            (e.ɵdir = Ae({
              type: e,
              selectors: [['', 'ngSwitchDefault', '']],
            })),
            e
          )
        })(),
        Gl = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵmod = qt({ type: e })),
            (e.ɵinj = St({})),
            e
          )
        })()
      let aS = (() => {
        class e {}
        return (
          (e.ɵprov = $({
            token: e,
            providedIn: 'root',
            factory: () => new uS(S(ut), window),
          })),
          e
        )
      })()
      class uS {
        constructor(t, n) {
          ;(this.document = t), (this.window = n), (this.offset = () => [0, 0])
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0]
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return
          const n = (function lS(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0]
            if (n) return n
            if (
              'function' == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT)
              let i = r.currentNode
              for (; i; ) {
                const o = i.shadowRoot
                if (o) {
                  const s =
                    o.getElementById(t) || o.querySelector(`[name="${t}"]`)
                  if (s) return s
                }
                i = r.nextNode()
              }
            }
            return null
          })(this.document, t)
          n && (this.scrollToElement(n), n.focus())
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history
            n && n.scrollRestoration && (n.scrollRestoration = t)
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            i = n.top + this.window.pageYOffset,
            o = this.offset()
          this.window.scrollTo(r - o[0], i - o[1])
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1
            const t =
              ay(this.window.history) ||
              ay(Object.getPrototypeOf(this.window.history))
            return !(!t || (!t.writable && !t.set))
          } catch (t) {
            return !1
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              'pageXOffset' in this.window
            )
          } catch (t) {
            return !1
          }
        }
      }
      function ay(e) {
        return Object.getOwnPropertyDescriptor(e, 'scrollRestoration')
      }
      class ql extends class dS extends class LM {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0)
        }
      } {
        static makeCurrent() {
          !(function kM(e) {
            us || (us = e)
          })(new ql())
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1)
            }
          )
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n)
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t)
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t)
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle')
        }
        getDefaultDocument() {
          return document
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment
        }
        getGlobalEventTarget(t, n) {
          return 'window' === n
            ? window
            : 'document' === n
            ? t
            : 'body' === n
            ? t.body
            : null
        }
        getBaseHref(t) {
          const n = (function fS() {
            return (
              (ki = ki || document.querySelector('base')),
              ki ? ki.getAttribute('href') : null
            )
          })()
          return null == n
            ? null
            : (function hS(e) {
                ;(Ds = Ds || document.createElement('a')),
                  Ds.setAttribute('href', e)
                const t = Ds.pathname
                return '/' === t.charAt(0) ? t : `/${t}`
              })(n)
        }
        resetBaseElement() {
          ki = null
        }
        getUserAgent() {
          return window.navigator.userAgent
        }
        getCookie(t) {
          return (function SI(e, t) {
            t = encodeURIComponent(t)
            for (const n of e.split(';')) {
              const r = n.indexOf('='),
                [i, o] = -1 == r ? [n, ''] : [n.slice(0, r), n.slice(r + 1)]
              if (i.trim() === t) return decodeURIComponent(o)
            }
            return null
          })(document.cookie, t)
        }
      }
      let Ds,
        ki = null
      const uy = new W('TRANSITION_ID'),
        gS = [
          {
            provide: pl,
            useFactory: function pS(e, t, n) {
              return () => {
                n.get(gl).donePromise.then(() => {
                  const r = Dn(),
                    i = t.querySelectorAll(`style[ng-transition="${e}"]`)
                  for (let o = 0; o < i.length; o++) r.remove(i[o])
                })
              }
            },
            deps: [uy, ut, $e],
            multi: !0,
          },
        ]
      class Wl {
        static init() {
          !(function cM(e) {
            wl = e
          })(new Wl())
        }
        addToWindow(t) {
          ;(Y.getAngularTestability = (r, i = !0) => {
            const o = t.findTestabilityInTree(r, i)
            if (null == o)
              throw new Error('Could not find testability for element.')
            return o
          }),
            (Y.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Y.getAllAngularRootElements = () => t.getAllRootElements()),
            Y.frameworkStabilizers || (Y.frameworkStabilizers = []),
            Y.frameworkStabilizers.push((r) => {
              const i = Y.getAllAngularTestabilities()
              let o = i.length,
                s = !1
              const a = function (u) {
                ;(s = s || u), o--, 0 == o && r(s)
              }
              i.forEach(function (u) {
                u.whenStable(a)
              })
            })
        }
        findTestabilityInTree(t, n, r) {
          if (null == n) return null
          const i = t.getTestability(n)
          return null != i
            ? i
            : r
            ? Dn().isShadowRoot(n)
              ? this.findTestabilityInTree(t, n.host, !0)
              : this.findTestabilityInTree(t, n.parentElement, !0)
            : null
        }
      }
      let mS = (() => {
        class e {
          build() {
            return new XMLHttpRequest()
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)()
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      const _s = new W('EventManagerPlugins')
      let Cs = (() => {
        class e {
          constructor(n, r) {
            ;(this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => (i.manager = this)),
              (this._plugins = n.slice().reverse())
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i)
          }
          addGlobalEventListener(n, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, i)
          }
          getZone() {
            return this._zone
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n)
            if (r) return r
            const i = this._plugins
            for (let o = 0; o < i.length; o++) {
              const s = i[o]
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s
            }
            throw new Error(`No event manager plugin found for event ${n}`)
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(_s), S(Ie))
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      class ly {
        constructor(t) {
          this._doc = t
        }
        addGlobalEventListener(t, n, r) {
          const i = Dn().getGlobalEventTarget(this._doc, t)
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${n}`)
          return this.addEventListener(i, n, r)
        }
      }
      let cy = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set()
            }
            addStyles(n) {
              const r = new Set()
              n.forEach((i) => {
                this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i))
              }),
                this.onStylesAdded(r)
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet)
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac })),
            e
          )
        })(),
        Li = (() => {
          class e extends cy {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, [])
            }
            _addStylesToHost(n, r, i) {
              n.forEach((o) => {
                const s = this._doc.createElement('style')
                ;(s.textContent = o), i.push(r.appendChild(s))
              })
            }
            addHost(n) {
              const r = []
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r)
            }
            removeHost(n) {
              const r = this._hostNodes.get(n)
              r && r.forEach(dy), this._hostNodes.delete(n)
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(n, i, r)
              })
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(dy))
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S(ut))
            }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac })),
            e
          )
        })()
      function dy(e) {
        Dn().remove(e)
      }
      const Zl = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        Ql = /%COMP%/g
      function ws(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let i = t[r]
          Array.isArray(i) ? ws(e, i, n) : ((i = i.replace(Ql, e)), n.push(i))
        }
        return n
      }
      function py(e) {
        return (t) => {
          if ('__ngUnwrap__' === t) return e
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1))
        }
      }
      let Yl = (() => {
        class e {
          constructor(n, r, i) {
            ;(this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Kl(n))
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer
            switch (r.encapsulation) {
              case Tt.Emulated: {
                let i = this.rendererByCompId.get(r.id)
                return (
                  i ||
                    ((i = new wS(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, i)),
                  i.applyToHost(n),
                  i
                )
              }
              case 1:
              case Tt.ShadowDom:
                return new ES(this.eventManager, this.sharedStylesHost, n, r)
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = ws(r.id, r.styles, [])
                  this.sharedStylesHost.addStyles(i),
                    this.rendererByCompId.set(r.id, this.defaultRenderer)
                }
                return this.defaultRenderer
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(Cs), S(Li), S(Pi))
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      class Kl {
        constructor(t) {
          ;(this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null)
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Zl[n] || n, t)
            : document.createElement(t)
        }
        createComment(t) {
          return document.createComment(t)
        }
        createText(t) {
          return document.createTextNode(t)
        }
        appendChild(t, n) {
          t.appendChild(n)
        }
        insertBefore(t, n, r) {
          t && t.insertBefore(n, r)
        }
        removeChild(t, n) {
          t && t.removeChild(n)
        }
        selectRootElement(t, n) {
          let r = 'string' == typeof t ? document.querySelector(t) : t
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`)
          return n || (r.textContent = ''), r
        }
        parentNode(t) {
          return t.parentNode
        }
        nextSibling(t) {
          return t.nextSibling
        }
        setAttribute(t, n, r, i) {
          if (i) {
            n = i + ':' + n
            const o = Zl[i]
            o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r)
          } else t.setAttribute(n, r)
        }
        removeAttribute(t, n, r) {
          if (r) {
            const i = Zl[r]
            i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`)
          } else t.removeAttribute(n)
        }
        addClass(t, n) {
          t.classList.add(n)
        }
        removeClass(t, n) {
          t.classList.remove(n)
        }
        setStyle(t, n, r, i) {
          i & (Ye.DashCase | Ye.Important)
            ? t.style.setProperty(n, r, i & Ye.Important ? 'important' : '')
            : (t.style[n] = r)
        }
        removeStyle(t, n, r) {
          r & Ye.DashCase ? t.style.removeProperty(n) : (t.style[n] = '')
        }
        setProperty(t, n, r) {
          t[n] = r
        }
        setValue(t, n) {
          t.nodeValue = n
        }
        listen(t, n, r) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, py(r))
            : this.eventManager.addEventListener(t, n, py(r))
        }
      }
      class wS extends Kl {
        constructor(t, n, r, i) {
          super(t), (this.component = r)
          const o = ws(i + '-' + r.id, r.styles, [])
          n.addStyles(o),
            (this.contentAttr = (function DS(e) {
              return '_ngcontent-%COMP%'.replace(Ql, e)
            })(i + '-' + r.id)),
            (this.hostAttr = (function _S(e) {
              return '_nghost-%COMP%'.replace(Ql, e)
            })(i + '-' + r.id))
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, '')
        }
        createElement(t, n) {
          const r = super.createElement(t, n)
          return super.setAttribute(r, this.contentAttr, ''), r
        }
      }
      class ES extends Kl {
        constructor(t, n, r, i) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot)
          const o = ws(i.id, i.styles, [])
          for (let s = 0; s < o.length; s++) {
            const a = document.createElement('style')
            ;(a.textContent = o[s]), this.shadowRoot.appendChild(a)
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot)
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n)
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n)
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          )
        }
      }
      let bS = (() => {
        class e extends ly {
          constructor(n) {
            super(n)
          }
          supports(n) {
            return !0
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            )
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i)
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(ut))
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      const my = ['alt', 'control', 'meta', 'shift'],
        IS = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        yy = {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5',
          F: '6',
          G: '7',
          H: '8',
          I: '9',
          J: '*',
          K: '+',
          M: '-',
          N: '.',
          O: '/',
          '`': '0',
          '\x90': 'NumLock',
        },
        SS = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        }
      let TS = (() => {
        class e extends ly {
          constructor(n) {
            super(n)
          }
          supports(n) {
            return null != e.parseEventName(n)
          }
          addEventListener(n, r, i) {
            const o = e.parseEventName(r),
              s = e.eventCallback(o.fullKey, i, this.manager.getZone())
            return this.manager
              .getZone()
              .runOutsideAngular(() => Dn().onAndCancel(n, o.domEventName, s))
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split('.'),
              i = r.shift()
            if (0 === r.length || ('keydown' !== i && 'keyup' !== i))
              return null
            const o = e._normalizeKey(r.pop())
            let s = ''
            if (
              (my.forEach((u) => {
                const l = r.indexOf(u)
                l > -1 && (r.splice(l, 1), (s += u + '.'))
              }),
              (s += o),
              0 != r.length || 0 === o.length)
            )
              return null
            const a = {}
            return (a.domEventName = i), (a.fullKey = s), a
          }
          static getEventFullKey(n) {
            let r = '',
              i = (function AS(e) {
                let t = e.key
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return 'Unidentified'
                  t.startsWith('U+') &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && yy.hasOwnProperty(t) && (t = yy[t]))
                }
                return IS[t] || t
              })(n)
            return (
              (i = i.toLowerCase()),
              ' ' === i ? (i = 'space') : '.' === i && (i = 'dot'),
              my.forEach((o) => {
                o != i && SS[o](n) && (r += o + '.')
              }),
              (r += i),
              r
            )
          }
          static eventCallback(n, r, i) {
            return (o) => {
              e.getEventFullKey(o) === n && i.runGuarded(() => r(o))
            }
          }
          static _normalizeKey(n) {
            return 'esc' === n ? 'escape' : n
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(ut))
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      const OS = Mm(OM, 'browser', [
          { provide: yl, useValue: 'browser' },
          {
            provide: mm,
            useValue: function xS() {
              ql.makeCurrent(), Wl.init()
            },
            multi: !0,
          },
          {
            provide: ut,
            useFactory: function PS() {
              return (
                (function B0(e) {
                  la = e
                })(document),
                document
              )
            },
            deps: [],
          },
        ]),
        NS = [
          { provide: bu, useValue: 'root' },
          {
            provide: pi,
            useFactory: function RS() {
              return new pi()
            },
            deps: [],
          },
          { provide: _s, useClass: bS, multi: !0, deps: [ut, Ie, yl] },
          { provide: _s, useClass: TS, multi: !0, deps: [ut] },
          { provide: Yl, useClass: Yl, deps: [Cs, Li, Pi] },
          { provide: Og, useExisting: Yl },
          { provide: cy, useExisting: Li },
          { provide: Li, useClass: Li, deps: [ut] },
          { provide: Cl, useClass: Cl, deps: [Ie] },
          { provide: Cs, useClass: Cs, deps: [_s, Ie] },
          { provide: class cS {}, useClass: mS, deps: [] },
        ]
      let FS = (() => {
        class e {
          constructor(n) {
            if (n)
              throw new Error(
                'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
              )
          }
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [
                { provide: Pi, useValue: n.appId },
                { provide: uy, useExisting: Pi },
                gS,
              ],
            }
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(e, 12))
          }),
          (e.ɵmod = qt({ type: e })),
          (e.ɵinj = St({ providers: NS, imports: [Gl, NM] })),
          e
        )
      })()
      function k(...e) {
        return Te(e, zr(e))
      }
      'undefined' != typeof window && window
      class Mt extends Ht {
        constructor(t) {
          super(), (this._value = t)
        }
        get value() {
          return this.getValue()
        }
        _subscribe(t) {
          const n = super._subscribe(t)
          return !n.closed && t.next(this._value), n
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this
          if (t) throw n
          return this._throwIfClosed(), r
        }
        next(t) {
          super.next((this._value = t))
        }
      }
      const { isArray: qS } = Array,
        { getPrototypeOf: WS, prototype: ZS, keys: QS } = Object
      const { isArray: JS } = Array
      function nT(...e) {
        const t = zr(e),
          n = (function e0(e) {
            return X(Gs(e)) ? e.pop() : void 0
          })(e),
          { args: r, keys: i } = (function YS(e) {
            if (1 === e.length) {
              const t = e[0]
              if (qS(t)) return { args: t, keys: null }
              if (
                (function KS(e) {
                  return e && 'object' == typeof e && WS(e) === ZS
                })(t)
              ) {
                const n = QS(t)
                return { args: n.map((r) => t[r]), keys: n }
              }
            }
            return { args: e, keys: null }
          })(e)
        if (0 === r.length) return Te([], t)
        const o = new ye(
          (function rT(e, t, n = Mn) {
            return (r) => {
              _y(
                t,
                () => {
                  const { length: i } = e,
                    o = new Array(i)
                  let s = i,
                    a = i
                  for (let u = 0; u < i; u++)
                    _y(
                      t,
                      () => {
                        const l = Te(e[u], t)
                        let c = !1
                        l.subscribe(
                          Me(
                            r,
                            (d) => {
                              ;(o[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(o.slice()))
                            },
                            () => {
                              --s || r.complete()
                            }
                          )
                        )
                      },
                      r
                    )
                },
                r
              )
            }
          })(
            r,
            t,
            i
              ? (s) =>
                  (function tT(e, t) {
                    return e.reduce((n, r, i) => ((n[r] = t[i]), n), {})
                  })(i, s)
              : Mn
          )
        )
        return n
          ? o.pipe(
              (function eT(e) {
                return ne((t) =>
                  (function XS(e, t) {
                    return JS(t) ? e(...t) : e(t)
                  })(e, t)
                )
              })(n)
            )
          : o
      }
      function _y(e, t, n) {
        e ? Ut(n, e, t) : t()
      }
      function Es(e, t) {
        const n = X(e) ? e : () => e,
          r = (i) => i.error(n())
        return new ye(t ? (i) => t.schedule(r, 0, i) : r)
      }
      const bs = Br(
        (e) =>
          function () {
            e(this),
              (this.name = 'EmptyError'),
              (this.message = 'no elements in sequence')
          }
      )
      function Xl(...e) {
        return (function iT() {
          return $r(1)
        })()(Te(e, zr(e)))
      }
      function Cy(e) {
        return new ye((t) => {
          It(e()).subscribe(t)
        })
      }
      function wy() {
        return be((e, t) => {
          let n = null
          e._refCount++
          const r = Me(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null)
            const i = e._connection,
              o = n
            ;(n = null),
              i && (!o || i === o) && i.unsubscribe(),
              t.unsubscribe()
          })
          e.subscribe(r), r.closed || (n = e.connect())
        })
      }
      class oT extends ye {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Bc(t) && (this.lift = t.lift)
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t)
        }
        getSubject() {
          const t = this._subject
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          )
        }
        _teardown() {
          this._refCount = 0
          const { _connection: t } = this
          ;(this._subject = this._connection = null),
            null == t || t.unsubscribe()
        }
        connect() {
          let t = this._connection
          if (!t) {
            t = this._connection = new tt()
            const n = this.getSubject()
            t.add(
              this.source.subscribe(
                Me(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete()
                  },
                  (r) => {
                    this._teardown(), n.error(r)
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = tt.EMPTY))
          }
          return t
        }
        refCount() {
          return wy()(this)
        }
      }
      function Bn(e, t) {
        return be((n, r) => {
          let i = null,
            o = 0,
            s = !1
          const a = () => s && !i && r.complete()
          n.subscribe(
            Me(
              r,
              (u) => {
                null == i || i.unsubscribe()
                let l = 0
                const c = o++
                It(e(u, c)).subscribe(
                  (i = Me(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      ;(i = null), a()
                    }
                  ))
                )
              },
              () => {
                ;(s = !0), a()
              }
            )
          )
        })
      }
      function ec(e) {
        return e <= 0
          ? () => $t
          : be((t, n) => {
              let r = 0
              t.subscribe(
                Me(n, (i) => {
                  ++r <= e && (n.next(i), e <= r && n.complete())
                })
              )
            })
      }
      function aT(e, t, n, r, i) {
        return (o, s) => {
          let a = n,
            u = t,
            l = 0
          o.subscribe(
            Me(
              s,
              (c) => {
                const d = l++
                ;(u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u)
              },
              i &&
                (() => {
                  a && s.next(u), s.complete()
                })
            )
          )
        }
      }
      function Ey(e, t) {
        return be(aT(e, t, arguments.length >= 2, !0))
      }
      function Nr(e, t) {
        return be((n, r) => {
          let i = 0
          n.subscribe(Me(r, (o) => e.call(t, o, i++) && r.next(o)))
        })
      }
      function Cn(e) {
        return be((t, n) => {
          let o,
            r = null,
            i = !1
          ;(r = t.subscribe(
            Me(n, void 0, void 0, (s) => {
              ;(o = It(e(s, Cn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), o.subscribe(n)) : (i = !0)
            })
          )),
            i && (r.unsubscribe(), (r = null), o.subscribe(n))
        })
      }
      function ji(e, t) {
        return X(t) ? we(e, t, 1) : we(e, 1)
      }
      function tc(e) {
        return e <= 0
          ? () => $t
          : be((t, n) => {
              let r = []
              t.subscribe(
                Me(
                  n,
                  (i) => {
                    r.push(i), e < r.length && r.shift()
                  },
                  () => {
                    for (const i of r) n.next(i)
                    n.complete()
                  },
                  void 0,
                  () => {
                    r = null
                  }
                )
              )
            })
      }
      function by(e = uT) {
        return be((t, n) => {
          let r = !1
          t.subscribe(
            Me(
              n,
              (i) => {
                ;(r = !0), n.next(i)
              },
              () => (r ? n.complete() : n.error(e()))
            )
          )
        })
      }
      function uT() {
        return new bs()
      }
      function My(e) {
        return be((t, n) => {
          let r = !1
          t.subscribe(
            Me(
              n,
              (i) => {
                ;(r = !0), n.next(i)
              },
              () => {
                r || n.next(e), n.complete()
              }
            )
          )
        })
      }
      function Fr(e, t) {
        const n = arguments.length >= 2
        return (r) =>
          r.pipe(
            e ? Nr((i, o) => e(i, o, r)) : Mn,
            ec(1),
            n ? My(t) : by(() => new bs())
          )
      }
      function Je(e, t, n) {
        const r = X(e) || t || n ? { next: e, error: t, complete: n } : e
        return r
          ? be((i, o) => {
              var s
              null === (s = r.subscribe) || void 0 === s || s.call(r)
              let a = !0
              i.subscribe(
                Me(
                  o,
                  (u) => {
                    var l
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      o.next(u)
                  },
                  () => {
                    var u
                    ;(a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      o.complete()
                  },
                  (u) => {
                    var l
                    ;(a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      o.error(u)
                  },
                  () => {
                    var u, l
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r)
                  }
                )
              )
            })
          : Mn
      }
      class tn {
        constructor(t, n) {
          ;(this.id = t), (this.url = n)
        }
      }
      class nc extends tn {
        constructor(t, n, r = 'imperative', i = null) {
          super(t, n), (this.navigationTrigger = r), (this.restoredState = i)
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`
        }
      }
      class Vi extends tn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r)
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
        }
      }
      class Iy extends tn {
        constructor(t, n, r) {
          super(t, n), (this.reason = r)
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
        }
      }
      class dT extends tn {
        constructor(t, n, r) {
          super(t, n), (this.error = r)
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
        }
      }
      class fT extends tn {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i)
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class hT extends tn {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i)
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class pT extends tn {
        constructor(t, n, r, i, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = o)
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
        }
      }
      class gT extends tn {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i)
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class mT extends tn {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i)
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class Sy {
        constructor(t) {
          this.route = t
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`
        }
      }
      class Ty {
        constructor(t) {
          this.route = t
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`
        }
      }
      class yT {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`
        }
      }
      class vT {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`
        }
      }
      class DT {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`
        }
      }
      class _T {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`
        }
      }
      class Ay {
        constructor(t, n, r) {
          ;(this.routerEvent = t), (this.position = n), (this.anchor = r)
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`
        }
      }
      const V = 'primary'
      class CT {
        constructor(t) {
          this.params = t || {}
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t)
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t]
            return Array.isArray(n) ? n[0] : n
          }
          return null
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t]
            return Array.isArray(n) ? n : [n]
          }
          return []
        }
        get keys() {
          return Object.keys(this.params)
        }
      }
      function kr(e) {
        return new CT(e)
      }
      const xy = 'ngNavigationCancelingError'
      function rc(e) {
        const t = Error('NavigationCancelingError: ' + e)
        return (t[xy] = !0), t
      }
      function ET(e, t, n) {
        const r = n.path.split('/')
        if (
          r.length > e.length ||
          ('full' === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null
        const i = {}
        for (let o = 0; o < r.length; o++) {
          const s = r[o],
            a = e[o]
          if (s.startsWith(':')) i[s.substring(1)] = a
          else if (s !== a.path) return null
        }
        return { consumed: e.slice(0, r.length), posParams: i }
      }
      function Vt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0
        if (!n || !r || n.length != r.length) return !1
        let i
        for (let o = 0; o < n.length; o++)
          if (((i = n[o]), !Ry(e[i], t[i]))) return !1
        return !0
      }
      function Ry(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1
          const n = [...e].sort(),
            r = [...t].sort()
          return n.every((i, o) => r[o] === i)
        }
        return e === t
      }
      function Py(e) {
        return Array.prototype.concat.apply([], e)
      }
      function Oy(e) {
        return e.length > 0 ? e[e.length - 1] : null
      }
      function Se(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n)
      }
      function Bt(e) {
        return cp(e) ? e : zo(e) ? Te(Promise.resolve(e)) : k(e)
      }
      const IT = {
          exact: function ky(e, t, n) {
            if (
              !Un(e.segments, t.segments) ||
              !Ms(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1
            for (const r in t.children)
              if (!e.children[r] || !ky(e.children[r], t.children[r], n))
                return !1
            return !0
          },
          subset: Ly,
        },
        Ny = {
          exact: function ST(e, t) {
            return Vt(e, t)
          },
          subset: function TT(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Ry(e[n], t[n]))
            )
          },
          ignored: () => !0,
        }
      function Fy(e, t, n) {
        return (
          IT[n.paths](e.root, t.root, n.matrixParams) &&
          Ny[n.queryParams](e.queryParams, t.queryParams) &&
          !('exact' === n.fragment && e.fragment !== t.fragment)
        )
      }
      function Ly(e, t, n) {
        return jy(e, t, t.segments, n)
      }
      function jy(e, t, n, r) {
        if (e.segments.length > n.length) {
          const i = e.segments.slice(0, n.length)
          return !(!Un(i, n) || t.hasChildren() || !Ms(i, n, r))
        }
        if (e.segments.length === n.length) {
          if (!Un(e.segments, n) || !Ms(e.segments, n, r)) return !1
          for (const i in t.children)
            if (!e.children[i] || !Ly(e.children[i], t.children[i], r))
              return !1
          return !0
        }
        {
          const i = n.slice(0, e.segments.length),
            o = n.slice(e.segments.length)
          return (
            !!(Un(e.segments, i) && Ms(e.segments, i, r) && e.children[V]) &&
            jy(e.children[V], t, o, r)
          )
        }
      }
      function Ms(e, t, n) {
        return t.every((r, i) => Ny[n](e[i].parameters, r.parameters))
      }
      class Hn {
        constructor(t, n, r) {
          ;(this.root = t), (this.queryParams = n), (this.fragment = r)
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = kr(this.queryParams)),
            this._queryParamMap
          )
        }
        toString() {
          return RT.serialize(this)
        }
      }
      class U {
        constructor(t, n) {
          ;(this.segments = t),
            (this.children = n),
            (this.parent = null),
            Se(n, (r, i) => (r.parent = this))
        }
        hasChildren() {
          return this.numberOfChildren > 0
        }
        get numberOfChildren() {
          return Object.keys(this.children).length
        }
        toString() {
          return Is(this)
        }
      }
      class Bi {
        constructor(t, n) {
          ;(this.path = t), (this.parameters = n)
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = kr(this.parameters)),
            this._parameterMap
          )
        }
        toString() {
          return $y(this)
        }
      }
      function Un(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path)
      }
      class Vy {}
      class By {
        parse(t) {
          const n = new BT(t)
          return new Hn(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          )
        }
        serialize(t) {
          const n = `/${Hi(t.root, !0)}`,
            r = (function NT(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n]
                  return Array.isArray(r)
                    ? r.map((i) => `${Ss(n)}=${Ss(i)}`).join('&')
                    : `${Ss(n)}=${Ss(r)}`
                })
                .filter((n) => !!n)
              return t.length ? `?${t.join('&')}` : ''
            })(t.queryParams)
          return `${n}${r}${
            'string' == typeof t.fragment
              ? `#${(function PT(e) {
                  return encodeURI(e)
                })(t.fragment)}`
              : ''
          }`
        }
      }
      const RT = new By()
      function Is(e) {
        return e.segments.map((t) => $y(t)).join('/')
      }
      function Hi(e, t) {
        if (!e.hasChildren()) return Is(e)
        if (t) {
          const n = e.children[V] ? Hi(e.children[V], !1) : '',
            r = []
          return (
            Se(e.children, (i, o) => {
              o !== V && r.push(`${o}:${Hi(i, !1)}`)
            }),
            r.length > 0 ? `${n}(${r.join('//')})` : n
          )
        }
        {
          const n = (function xT(e, t) {
            let n = []
            return (
              Se(e.children, (r, i) => {
                i === V && (n = n.concat(t(r, i)))
              }),
              Se(e.children, (r, i) => {
                i !== V && (n = n.concat(t(r, i)))
              }),
              n
            )
          })(e, (r, i) =>
            i === V ? [Hi(e.children[V], !1)] : [`${i}:${Hi(r, !1)}`]
          )
          return 1 === Object.keys(e.children).length && null != e.children[V]
            ? `${Is(e)}/${n[0]}`
            : `${Is(e)}/(${n.join('//')})`
        }
      }
      function Hy(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
      }
      function Ss(e) {
        return Hy(e).replace(/%3B/gi, ';')
      }
      function ic(e) {
        return Hy(e)
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
          .replace(/%26/gi, '&')
      }
      function Ts(e) {
        return decodeURIComponent(e)
      }
      function Uy(e) {
        return Ts(e.replace(/\+/g, '%20'))
      }
      function $y(e) {
        return `${ic(e.path)}${(function OT(e) {
          return Object.keys(e)
            .map((t) => `;${ic(t)}=${ic(e[t])}`)
            .join('')
        })(e.parameters)}`
      }
      const FT = /^[^\/()?;=#]+/
      function As(e) {
        const t = e.match(FT)
        return t ? t[0] : ''
      }
      const kT = /^[^=?&#]+/,
        jT = /^[^&#]+/
      class BT {
        constructor(t) {
          ;(this.url = t), (this.remaining = t)
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining ||
            this.peekStartsWith('?') ||
            this.peekStartsWith('#')
              ? new U([], {})
              : new U([], this.parseChildren())
          )
        }
        parseQueryParams() {
          const t = {}
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(t)
            } while (this.consumeOptional('&'))
          return t
        }
        parseFragment() {
          return this.consumeOptional('#')
            ? decodeURIComponent(this.remaining)
            : null
        }
        parseChildren() {
          if ('' === this.remaining) return {}
          this.consumeOptional('/')
          const t = []
          for (
            this.peekStartsWith('(') || t.push(this.parseSegment());
            this.peekStartsWith('/') &&
            !this.peekStartsWith('//') &&
            !this.peekStartsWith('/(');

          )
            this.capture('/'), t.push(this.parseSegment())
          let n = {}
          this.peekStartsWith('/(') &&
            (this.capture('/'), (n = this.parseParens(!0)))
          let r = {}
          return (
            this.peekStartsWith('(') && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[V] = new U(t, n)),
            r
          )
        }
        parseSegment() {
          const t = As(this.remaining)
          if ('' === t && this.peekStartsWith(';'))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            )
          return this.capture(t), new Bi(Ts(t), this.parseMatrixParams())
        }
        parseMatrixParams() {
          const t = {}
          for (; this.consumeOptional(';'); ) this.parseParam(t)
          return t
        }
        parseParam(t) {
          const n = As(this.remaining)
          if (!n) return
          this.capture(n)
          let r = ''
          if (this.consumeOptional('=')) {
            const i = As(this.remaining)
            i && ((r = i), this.capture(r))
          }
          t[Ts(n)] = Ts(r)
        }
        parseQueryParam(t) {
          const n = (function LT(e) {
            const t = e.match(kT)
            return t ? t[0] : ''
          })(this.remaining)
          if (!n) return
          this.capture(n)
          let r = ''
          if (this.consumeOptional('=')) {
            const s = (function VT(e) {
              const t = e.match(jT)
              return t ? t[0] : ''
            })(this.remaining)
            s && ((r = s), this.capture(r))
          }
          const i = Uy(n),
            o = Uy(r)
          if (t.hasOwnProperty(i)) {
            let s = t[i]
            Array.isArray(s) || ((s = [s]), (t[i] = s)), s.push(o)
          } else t[i] = o
        }
        parseParens(t) {
          const n = {}
          for (
            this.capture('(');
            !this.consumeOptional(')') && this.remaining.length > 0;

          ) {
            const r = As(this.remaining),
              i = this.remaining[r.length]
            if ('/' !== i && ')' !== i && ';' !== i)
              throw new Error(`Cannot parse url '${this.url}'`)
            let o
            r.indexOf(':') > -1
              ? ((o = r.substr(0, r.indexOf(':'))),
                this.capture(o),
                this.capture(':'))
              : t && (o = V)
            const s = this.parseChildren()
            ;(n[o] = 1 === Object.keys(s).length ? s[V] : new U([], s)),
              this.consumeOptional('//')
          }
          return n
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t)
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          )
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`)
        }
      }
      class zy {
        constructor(t) {
          this._root = t
        }
        get root() {
          return this._root.value
        }
        parent(t) {
          const n = this.pathFromRoot(t)
          return n.length > 1 ? n[n.length - 2] : null
        }
        children(t) {
          const n = oc(t, this._root)
          return n ? n.children.map((r) => r.value) : []
        }
        firstChild(t) {
          const n = oc(t, this._root)
          return n && n.children.length > 0 ? n.children[0].value : null
        }
        siblings(t) {
          const n = sc(t, this._root)
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== t)
        }
        pathFromRoot(t) {
          return sc(t, this._root).map((n) => n.value)
        }
      }
      function oc(e, t) {
        if (e === t.value) return t
        for (const n of t.children) {
          const r = oc(e, n)
          if (r) return r
        }
        return null
      }
      function sc(e, t) {
        if (e === t.value) return [t]
        for (const n of t.children) {
          const r = sc(e, n)
          if (r.length) return r.unshift(t), r
        }
        return []
      }
      class nn {
        constructor(t, n) {
          ;(this.value = t), (this.children = n)
        }
        toString() {
          return `TreeNode(${this.value})`
        }
      }
      function Lr(e) {
        const t = {}
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t
      }
      class Gy extends zy {
        constructor(t, n) {
          super(t), (this.snapshot = n), ac(this, t)
        }
        toString() {
          return this.snapshot.toString()
        }
      }
      function qy(e, t) {
        const n = (function HT(e, t) {
            const s = new xs([], {}, {}, '', {}, V, t, null, e.root, -1, {})
            return new Zy('', new nn(s, []))
          })(e, t),
          r = new Mt([new Bi('', {})]),
          i = new Mt({}),
          o = new Mt({}),
          s = new Mt({}),
          a = new Mt(''),
          u = new jr(r, i, s, a, o, V, t, n.root)
        return (u.snapshot = n.root), new Gy(new nn(u, []), n)
      }
      class jr {
        constructor(t, n, r, i, o, s, a, u) {
          ;(this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u)
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig
        }
        get root() {
          return this._routerState.root
        }
        get parent() {
          return this._routerState.parent(this)
        }
        get firstChild() {
          return this._routerState.firstChild(this)
        }
        get children() {
          return this._routerState.children(this)
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(ne((t) => kr(t)))),
            this._paramMap
          )
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(ne((t) => kr(t)))),
            this._queryParamMap
          )
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`
        }
      }
      function Wy(e, t = 'emptyOnly') {
        const n = e.pathFromRoot
        let r = 0
        if ('always' !== t)
          for (r = n.length - 1; r >= 1; ) {
            const i = n[r],
              o = n[r - 1]
            if (i.routeConfig && '' === i.routeConfig.path) r--
            else {
              if (o.component) break
              r--
            }
          }
        return (function UT(e) {
          return e.reduce(
            (t, n) => ({
              params: Object.assign(Object.assign({}, t.params), n.params),
              data: Object.assign(Object.assign({}, t.data), n.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                n._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          )
        })(n.slice(r))
      }
      class xs {
        constructor(t, n, r, i, o, s, a, u, l, c, d) {
          ;(this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = d)
        }
        get root() {
          return this._routerState.root
        }
        get parent() {
          return this._routerState.parent(this)
        }
        get firstChild() {
          return this._routerState.firstChild(this)
        }
        get children() {
          return this._routerState.children(this)
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = kr(this.params)), this._paramMap
          )
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = kr(this.queryParams)),
            this._queryParamMap
          )
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join('/')}', path:'${
            this.routeConfig ? this.routeConfig.path : ''
          }')`
        }
      }
      class Zy extends zy {
        constructor(t, n) {
          super(n), (this.url = t), ac(this, n)
        }
        toString() {
          return Qy(this._root)
        }
      }
      function ac(e, t) {
        ;(t.value._routerState = e), t.children.forEach((n) => ac(e, n))
      }
      function Qy(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Qy).join(', ')} } ` : ''
        return `${e.value}${t}`
      }
      function uc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot
          ;(e.snapshot = n),
            Vt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Vt(t.params, n.params) || e.params.next(n.params),
            (function bT(e, t) {
              if (e.length !== t.length) return !1
              for (let n = 0; n < e.length; ++n) if (!Vt(e[n], t[n])) return !1
              return !0
            })(t.url, n.url) || e.url.next(n.url),
            Vt(t.data, n.data) || e.data.next(n.data)
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data)
      }
      function lc(e, t) {
        const n =
          Vt(e.params, t.params) &&
          (function AT(e, t) {
            return (
              Un(e, t) && e.every((n, r) => Vt(n.parameters, t[r].parameters))
            )
          })(e.url, t.url)
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || lc(e.parent, t.parent))
        )
      }
      function Ui(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value
          r._futureSnapshot = t.value
          const i = (function zT(e, t, n) {
            return t.children.map((r) => {
              for (const i of n.children)
                if (e.shouldReuseRoute(r.value, i.value.snapshot))
                  return Ui(e, r, i)
              return Ui(e, r)
            })
          })(e, t, n)
          return new nn(r, i)
        }
        {
          if (e.shouldAttach(t.value)) {
            const o = e.retrieve(t.value)
            if (null !== o) {
              const s = o.route
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Ui(e, a))),
                s
              )
            }
          }
          const r = (function GT(e) {
              return new jr(
                new Mt(e.url),
                new Mt(e.params),
                new Mt(e.queryParams),
                new Mt(e.fragment),
                new Mt(e.data),
                e.outlet,
                e.component,
                e
              )
            })(t.value),
            i = t.children.map((o) => Ui(e, o))
          return new nn(r, i)
        }
      }
      function Rs(e) {
        return 'object' == typeof e && null != e && !e.outlets && !e.segmentPath
      }
      function $i(e) {
        return 'object' == typeof e && null != e && e.outlets
      }
      function cc(e, t, n, r, i) {
        let o = {}
        if (
          (r &&
            Se(r, (a, u) => {
              o[u] = Array.isArray(a) ? a.map((l) => `${l}`) : `${a}`
            }),
          e === t)
        )
          return new Hn(n, o, i)
        const s = Yy(e, t, n)
        return new Hn(s, o, i)
      }
      function Yy(e, t, n) {
        const r = {}
        return (
          Se(e.children, (i, o) => {
            r[o] = i === t ? n : Yy(i, t, n)
          }),
          new U(e.segments, r)
        )
      }
      class Ky {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Rs(r[0]))
          )
            throw new Error('Root segment cannot have matrix parameters')
          const i = r.find($i)
          if (i && i !== Oy(r))
            throw new Error('{outlets:{}} has to be the last command')
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            '/' == this.commands[0]
          )
        }
      }
      class dc {
        constructor(t, n, r) {
          ;(this.segmentGroup = t), (this.processChildren = n), (this.index = r)
        }
      }
      function Jy(e, t, n) {
        if (
          (e || (e = new U([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Ps(e, t, n)
        const r = (function KT(e, t, n) {
            let r = 0,
              i = t
            const o = { match: !1, pathIndex: 0, commandIndex: 0 }
            for (; i < e.segments.length; ) {
              if (r >= n.length) return o
              const s = e.segments[i],
                a = n[r]
              if ($i(a)) break
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null
              if (i > 0 && void 0 === u) break
              if (u && l && 'object' == typeof l && void 0 === l.outlets) {
                if (!ev(u, l, s)) return o
                r += 2
              } else {
                if (!ev(u, {}, s)) return o
                r++
              }
              i++
            }
            return { match: !0, pathIndex: i, commandIndex: r }
          })(e, t, n),
          i = n.slice(r.commandIndex)
        if (r.match && r.pathIndex < e.segments.length) {
          const o = new U(e.segments.slice(0, r.pathIndex), {})
          return (
            (o.children[V] = new U(e.segments.slice(r.pathIndex), e.children)),
            Ps(o, 0, i)
          )
        }
        return r.match && 0 === i.length
          ? new U(e.segments, {})
          : r.match && !e.hasChildren()
          ? fc(e, t, n)
          : r.match
          ? Ps(e, 0, i)
          : fc(e, t, n)
      }
      function Ps(e, t, n) {
        if (0 === n.length) return new U(e.segments, {})
        {
          const r = (function YT(e) {
              return $i(e[0]) ? e[0].outlets : { [V]: e }
            })(n),
            i = {}
          return (
            Se(r, (o, s) => {
              'string' == typeof o && (o = [o]),
                null !== o && (i[s] = Jy(e.children[s], t, o))
            }),
            Se(e.children, (o, s) => {
              void 0 === r[s] && (i[s] = o)
            }),
            new U(e.segments, i)
          )
        }
      }
      function fc(e, t, n) {
        const r = e.segments.slice(0, t)
        let i = 0
        for (; i < n.length; ) {
          const o = n[i]
          if ($i(o)) {
            const u = JT(o.outlets)
            return new U(r, u)
          }
          if (0 === i && Rs(n[0])) {
            r.push(new Bi(e.segments[t].path, Xy(n[0]))), i++
            continue
          }
          const s = $i(o) ? o.outlets[V] : `${o}`,
            a = i < n.length - 1 ? n[i + 1] : null
          s && a && Rs(a)
            ? (r.push(new Bi(s, Xy(a))), (i += 2))
            : (r.push(new Bi(s, {})), i++)
        }
        return new U(r, {})
      }
      function JT(e) {
        const t = {}
        return (
          Se(e, (n, r) => {
            'string' == typeof n && (n = [n]),
              null !== n && (t[r] = fc(new U([], {}), 0, n))
          }),
          t
        )
      }
      function Xy(e) {
        const t = {}
        return Se(e, (n, r) => (t[r] = `${n}`)), t
      }
      function ev(e, t, n) {
        return e == n.path && Vt(t, n.parameters)
      }
      class eA {
        constructor(t, n, r, i) {
          ;(this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = i)
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null
          this.deactivateChildRoutes(n, r, t),
            uc(this.futureState.root),
            this.activateChildRoutes(n, r, t)
        }
        deactivateChildRoutes(t, n, r) {
          const i = Lr(n)
          t.children.forEach((o) => {
            const s = o.value.outlet
            this.deactivateRoutes(o, i[s], r), delete i[s]
          }),
            Se(i, (o, s) => {
              this.deactivateRouteAndItsChildren(o, r)
            })
        }
        deactivateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null
          if (i === o)
            if (i.component) {
              const s = r.getContext(i.outlet)
              s && this.deactivateChildRoutes(t, n, s.children)
            } else this.deactivateChildRoutes(t, n, r)
          else o && this.deactivateRouteAndItsChildren(n, r)
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n)
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = Lr(t)
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i)
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated()
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            })
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = Lr(t)
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i)
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null))
        }
        activateChildRoutes(t, n, r) {
          const i = Lr(n)
          t.children.forEach((o) => {
            this.activateRoutes(o, i[o.value.outlet], r),
              this.forwardEvent(new _T(o.value.snapshot))
          }),
            t.children.length && this.forwardEvent(new vT(t.value.snapshot))
        }
        activateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null
          if ((uc(i), i === o))
            if (i.component) {
              const s = r.getOrCreateContext(i.outlet)
              this.activateChildRoutes(t, n, s.children)
            } else this.activateChildRoutes(t, n, r)
          else if (i.component) {
            const s = r.getOrCreateContext(i.outlet)
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot)
              this.routeReuseStrategy.store(i.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                uc(a.route.value),
                this.activateChildRoutes(t, null, s.children)
            } else {
              const a = (function tA(e) {
                  for (let t = e.parent; t; t = t.parent) {
                    const n = t.routeConfig
                    if (n && n._loadedConfig) return n._loadedConfig
                    if (n && n.component) return null
                  }
                  return null
                })(i.snapshot),
                u = a ? a.module.componentFactoryResolver : null
              ;(s.attachRef = null),
                (s.route = i),
                (s.resolver = u),
                s.outlet && s.outlet.activateWith(i, u),
                this.activateChildRoutes(t, null, s.children)
            }
          } else this.activateChildRoutes(t, null, r)
        }
      }
      class hc {
        constructor(t, n) {
          ;(this.routes = t), (this.module = n)
        }
      }
      function wn(e) {
        return 'function' == typeof e
      }
      function $n(e) {
        return e instanceof Hn
      }
      const zi = Symbol('INITIAL_VALUE')
      function Gi() {
        return Bn((e) =>
          nT(
            e.map((t) =>
              t.pipe(
                ec(1),
                (function sT(...e) {
                  const t = zr(e)
                  return be((n, r) => {
                    ;(t ? Xl(e, n, t) : Xl(e, n)).subscribe(r)
                  })
                })(zi)
              )
            )
          ).pipe(
            Ey((t, n) => {
              let r = !1
              return n.reduce(
                (i, o, s) =>
                  i !== zi
                    ? i
                    : (o === zi && (r = !0),
                      r || (!1 !== o && s !== n.length - 1 && !$n(o)) ? i : o),
                t
              )
            }, zi),
            Nr((t) => t !== zi),
            ne((t) => ($n(t) ? t : !0 === t)),
            ec(1)
          )
        )
      }
      class aA {
        constructor() {
          ;(this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new qi()),
            (this.attachRef = null)
        }
      }
      class qi {
        constructor() {
          this.contexts = new Map()
        }
        onChildOutletCreated(t, n) {
          const r = this.getOrCreateContext(t)
          ;(r.outlet = n), this.contexts.set(t, r)
        }
        onChildOutletDestroyed(t) {
          const n = this.getContext(t)
          n && ((n.outlet = null), (n.attachRef = null))
        }
        onOutletDeactivated() {
          const t = this.contexts
          return (this.contexts = new Map()), t
        }
        onOutletReAttached(t) {
          this.contexts = t
        }
        getOrCreateContext(t) {
          let n = this.getContext(t)
          return n || ((n = new aA()), this.contexts.set(t, n)), n
        }
        getContext(t) {
          return this.contexts.get(t) || null
        }
      }
      let pc = (() => {
        class e {
          constructor(n, r, i, o, s) {
            ;(this.parentContexts = n),
              (this.location = r),
              (this.resolver = i),
              (this.changeDetector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Ve()),
              (this.deactivateEvents = new Ve()),
              (this.attachEvents = new Ve()),
              (this.detachEvents = new Ve()),
              (this.name = o || V),
              n.onChildOutletCreated(this.name, this)
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name)
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name)
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.resolver || null))
            }
          }
          get isActivated() {
            return !!this.activated
          }
          get component() {
            if (!this.activated) throw new Error('Outlet is not activated')
            return this.activated.instance
          }
          get activatedRoute() {
            if (!this.activated) throw new Error('Outlet is not activated')
            return this._activatedRoute
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {}
          }
          detach() {
            if (!this.activated) throw new Error('Outlet is not activated')
            this.location.detach()
            const n = this.activated
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            )
          }
          attach(n, r) {
            ;(this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance)
          }
          deactivate() {
            if (this.activated) {
              const n = this.component
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n)
            }
          }
          activateWith(n, r) {
            if (this.isActivated)
              throw new Error('Cannot activate an already activated outlet')
            this._activatedRoute = n
            const s = (r = r || this.resolver).resolveComponentFactory(
                n._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new uA(n, a, this.location.injector)
            ;(this.activated = this.location.createComponent(
              s,
              this.location.length,
              u
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance)
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              M(qi),
              M(Ct),
              M(Si),
              (function ti(e) {
                return (function gD(e, t) {
                  if ('class' === t) return e.classes
                  if ('style' === t) return e.styles
                  const n = e.attrs
                  if (n) {
                    const r = n.length
                    let i = 0
                    for (; i < r; ) {
                      const o = n[i]
                      if (Rd(o)) break
                      if (0 === o) i += 2
                      else if ('number' == typeof o)
                        for (i++; i < r && 'string' == typeof n[i]; ) i++
                      else {
                        if (o === t) return n[i + 1]
                        i += 2
                      }
                    }
                  }
                  return null
                })(ve(), e)
              })('name'),
              M(Ml)
            )
          }),
          (e.ɵdir = Ae({
            type: e,
            selectors: [['router-outlet']],
            outputs: {
              activateEvents: 'activate',
              deactivateEvents: 'deactivate',
              attachEvents: 'attach',
              detachEvents: 'detach',
            },
            exportAs: ['outlet'],
          })),
          e
        )
      })()
      class uA {
        constructor(t, n, r) {
          ;(this.route = t), (this.childContexts = n), (this.parent = r)
        }
        get(t, n) {
          return t === jr
            ? this.route
            : t === qi
            ? this.childContexts
            : this.parent.get(t, n)
        }
      }
      let tv = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)()
          }),
          (e.ɵcmp = qr({
            type: e,
            selectors: [['ng-component']],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && H(0, 'router-outlet')
            },
            directives: [pc],
            encapsulation: 2,
          })),
          e
        )
      })()
      function nv(e, t = '') {
        for (let n = 0; n < e.length; n++) {
          const r = e[n]
          lA(r, cA(t, r))
        }
      }
      function lA(e, t) {
        e.children && nv(e.children, t)
      }
      function cA(e, t) {
        return t
          ? e || t.path
            ? e && !t.path
              ? `${e}/`
              : !e && t.path
              ? t.path
              : `${e}/${t.path}`
            : ''
          : e
      }
      function gc(e) {
        const t = e.children && e.children.map(gc),
          n = t
            ? Object.assign(Object.assign({}, e), { children: t })
            : Object.assign({}, e)
        return (
          !n.component &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== V &&
            (n.component = tv),
          n
        )
      }
      function dt(e) {
        return e.outlet || V
      }
      function rv(e, t) {
        const n = e.filter((r) => dt(r) === t)
        return n.push(...e.filter((r) => dt(r) !== t)), n
      }
      const iv = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      }
      function Os(e, t, n) {
        var r
        if ('' === t.path)
          return 'full' === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? Object.assign({}, iv)
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              }
        const o = (t.matcher || ET)(n, e, t)
        if (!o) return Object.assign({}, iv)
        const s = {}
        Se(o.posParams, (u, l) => {
          s[l] = u.path
        })
        const a =
          o.consumed.length > 0
            ? Object.assign(
                Object.assign({}, s),
                o.consumed[o.consumed.length - 1].parameters
              )
            : s
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: a,
          positionalParamSegments:
            null !== (r = o.posParams) && void 0 !== r ? r : {},
        }
      }
      function Ns(e, t, n, r, i = 'corrected') {
        if (
          n.length > 0 &&
          (function hA(e, t, n) {
            return n.some((r) => Fs(e, t, r) && dt(r) !== V)
          })(e, n, r)
        ) {
          const s = new U(
            t,
            (function fA(e, t, n, r) {
              const i = {}
              ;(i[V] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length)
              for (const o of n)
                if ('' === o.path && dt(o) !== V) {
                  const s = new U([], {})
                  ;(s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (i[dt(o)] = s)
                }
              return i
            })(e, t, r, new U(n, e.children))
          )
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          )
        }
        if (
          0 === n.length &&
          (function pA(e, t, n) {
            return n.some((r) => Fs(e, t, r))
          })(e, n, r)
        ) {
          const s = new U(
            e.segments,
            (function dA(e, t, n, r, i, o) {
              const s = {}
              for (const a of r)
                if (Fs(e, n, a) && !i[dt(a)]) {
                  const u = new U([], {})
                  ;(u._sourceSegment = e),
                    (u._segmentIndexShift =
                      'legacy' === o ? e.segments.length : t.length),
                    (s[dt(a)] = u)
                }
              return Object.assign(Object.assign({}, i), s)
            })(e, t, n, r, e.children, i)
          )
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: n }
          )
        }
        const o = new U(e.segments, e.children)
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        )
      }
      function Fs(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || 'full' !== n.pathMatch) &&
          '' === n.path
        )
      }
      function ov(e, t, n, r) {
        return (
          !!(dt(e) === r || (r !== V && Fs(t, n, e))) &&
          ('**' === e.path || Os(t, e, n).matched)
        )
      }
      function sv(e, t, n) {
        return 0 === t.length && !e.children[n]
      }
      class ks {
        constructor(t) {
          this.segmentGroup = t || null
        }
      }
      class av {
        constructor(t) {
          this.urlTree = t
        }
      }
      function Wi(e) {
        return Es(new ks(e))
      }
      function uv(e) {
        return Es(new av(e))
      }
      class vA {
        constructor(t, n, r, i, o) {
          ;(this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = i),
            (this.config = o),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Kt))
        }
        apply() {
          const t = Ns(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new U(t.segments, t.children)
          return this.expandSegmentGroup(this.ngModule, this.config, n, V)
            .pipe(
              ne((o) =>
                this.createUrlTree(
                  mc(o),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Cn((o) => {
                if (o instanceof av)
                  return (this.allowRedirects = !1), this.match(o.urlTree)
                throw o instanceof ks ? this.noMatchError(o) : o
              })
            )
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, V)
            .pipe(
              ne((i) => this.createUrlTree(mc(i), t.queryParams, t.fragment))
            )
            .pipe(
              Cn((i) => {
                throw i instanceof ks ? this.noMatchError(i) : i
              })
            )
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          )
        }
        createUrlTree(t, n, r) {
          const i = t.segments.length > 0 ? new U([], { [V]: t }) : t
          return new Hn(i, n, r)
        }
        expandSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(ne((o) => new U([], o)))
            : this.expandSegment(t, r, n, r.segments, i, !0)
        }
        expandChildren(t, n, r) {
          const i = []
          for (const o of Object.keys(r.children))
            'primary' === o ? i.unshift(o) : i.push(o)
          return Te(i).pipe(
            ji((o) => {
              const s = r.children[o],
                a = rv(n, o)
              return this.expandSegmentGroup(t, a, s, o).pipe(
                ne((u) => ({ segment: u, outlet: o }))
              )
            }),
            Ey((o, s) => ((o[s.outlet] = s.segment), o), {}),
            (function lT(e, t) {
              const n = arguments.length >= 2
              return (r) =>
                r.pipe(
                  e ? Nr((i, o) => e(i, o, r)) : Mn,
                  tc(1),
                  n ? My(t) : by(() => new bs())
                )
            })()
          )
        }
        expandSegment(t, n, r, i, o, s) {
          return Te(r).pipe(
            ji((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, i, o, s).pipe(
                Cn((l) => {
                  if (l instanceof ks) return k(null)
                  throw l
                })
              )
            ),
            Fr((a) => !!a),
            Cn((a, u) => {
              if (a instanceof bs || 'EmptyError' === a.name)
                return sv(n, i, o) ? k(new U([], {})) : Wi(n)
              throw a
            })
          )
        }
        expandSegmentAgainstRoute(t, n, r, i, o, s, a) {
          return ov(i, n, o, s)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, i, o, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s)
              : Wi(n)
            : Wi(n)
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          return '**' === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, i, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                i,
                o,
                s
              )
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) {
          const o = this.applyRedirectCommands([], r.redirectTo, {})
          return r.redirectTo.startsWith('/')
            ? uv(o)
            : this.lineralizeSegments(r, o).pipe(
                we((s) => {
                  const a = new U(s, {})
                  return this.expandSegment(t, a, n, s, i, !1)
                })
              )
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = Os(n, i, o)
          if (!a) return Wi(n)
          const d = this.applyRedirectCommands(u, i.redirectTo, c)
          return i.redirectTo.startsWith('/')
            ? uv(d)
            : this.lineralizeSegments(i, d).pipe(
                we((f) => this.expandSegment(t, n, r, f.concat(l), s, !1))
              )
        }
        matchSegmentAgainstRoute(t, n, r, i, o) {
          if ('**' === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? k(r._loadedConfig)
                  : this.configLoader.load(t.injector, r)
                ).pipe(ne((d) => ((r._loadedConfig = d), new U(i, {}))))
              : k(new U(i, {}))
          const {
            matched: s,
            consumedSegments: a,
            remainingSegments: u,
          } = Os(n, r, i)
          return s
            ? this.getChildConfig(t, r, i).pipe(
                we((c) => {
                  const d = c.module,
                    f = c.routes,
                    { segmentGroup: h, slicedSegments: p } = Ns(n, a, u, f),
                    m = new U(h.segments, h.children)
                  if (0 === p.length && m.hasChildren())
                    return this.expandChildren(d, f, m).pipe(
                      ne((b) => new U(a, b))
                    )
                  if (0 === f.length && 0 === p.length) return k(new U(a, {}))
                  const v = dt(r) === o
                  return this.expandSegment(d, m, f, p, v ? V : o, !0).pipe(
                    ne((g) => new U(a.concat(g.segments), g.children))
                  )
                })
              )
            : Wi(n)
        }
        getChildConfig(t, n, r) {
          return n.children
            ? k(new hc(n.children, t))
            : n.loadChildren
            ? void 0 !== n._loadedConfig
              ? k(n._loadedConfig)
              : this.runCanLoadGuards(t.injector, n, r).pipe(
                  we((i) =>
                    i
                      ? this.configLoader
                          .load(t.injector, n)
                          .pipe(ne((o) => ((n._loadedConfig = o), o)))
                      : (function mA(e) {
                          return Es(
                            rc(
                              `Cannot load children because the guard of the route "path: '${e.path}'" returned false`
                            )
                          )
                        })(n)
                  )
                )
            : k(new hc([], t))
        }
        runCanLoadGuards(t, n, r) {
          const i = n.canLoad
          return i && 0 !== i.length
            ? k(
                i.map((s) => {
                  const a = t.get(s)
                  let u
                  if (
                    (function rA(e) {
                      return e && wn(e.canLoad)
                    })(a)
                  )
                    u = a.canLoad(n, r)
                  else {
                    if (!wn(a)) throw new Error('Invalid CanLoad guard')
                    u = a(n, r)
                  }
                  return Bt(u)
                })
              ).pipe(
                Gi(),
                Je((s) => {
                  if (!$n(s)) return
                  const a = rc(
                    `Redirecting to "${this.urlSerializer.serialize(s)}"`
                  )
                  throw ((a.url = s), a)
                }),
                ne((s) => !0 === s)
              )
            : k(!0)
        }
        lineralizeSegments(t, n) {
          let r = [],
            i = n.root
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return k(r)
            if (i.numberOfChildren > 1 || !i.children[V])
              return Es(
                new Error(
                  `Only absolute redirects can have named outlets. redirectTo: '${t.redirectTo}'`
                )
              )
            i = i.children[V]
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreatreUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          )
        }
        applyRedirectCreatreUrlTree(t, n, r, i) {
          const o = this.createSegmentGroup(t, n.root, r, i)
          return new Hn(
            o,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          )
        }
        createQueryParams(t, n) {
          const r = {}
          return (
            Se(t, (i, o) => {
              if ('string' == typeof i && i.startsWith(':')) {
                const a = i.substring(1)
                r[o] = n[a]
              } else r[o] = i
            }),
            r
          )
        }
        createSegmentGroup(t, n, r, i) {
          const o = this.createSegments(t, n.segments, r, i)
          let s = {}
          return (
            Se(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, i)
            }),
            new U(o, s)
          )
        }
        createSegments(t, n, r, i) {
          return n.map((o) =>
            o.path.startsWith(':')
              ? this.findPosParam(t, o, i)
              : this.findOrReturn(o, r)
          )
        }
        findPosParam(t, n, r) {
          const i = r[n.path.substring(1)]
          if (!i)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${n.path}'.`
            )
          return i
        }
        findOrReturn(t, n) {
          let r = 0
          for (const i of n) {
            if (i.path === t.path) return n.splice(r), i
            r++
          }
          return t
        }
      }
      function mc(e) {
        const t = {}
        for (const r of Object.keys(e.children)) {
          const o = mc(e.children[r])
          ;(o.segments.length > 0 || o.hasChildren()) && (t[r] = o)
        }
        return (function DA(e) {
          if (1 === e.numberOfChildren && e.children[V]) {
            const t = e.children[V]
            return new U(e.segments.concat(t.segments), t.children)
          }
          return e
        })(new U(e.segments, t))
      }
      class lv {
        constructor(t) {
          ;(this.path = t), (this.route = this.path[this.path.length - 1])
        }
      }
      class Ls {
        constructor(t, n) {
          ;(this.component = t), (this.route = n)
        }
      }
      function CA(e, t, n) {
        const r = e._root
        return Zi(r, t ? t._root : null, n, [r.value])
      }
      function js(e, t, n) {
        const r = (function EA(e) {
          if (!e) return null
          for (let t = e.parent; t; t = t.parent) {
            const n = t.routeConfig
            if (n && n._loadedConfig) return n._loadedConfig
          }
          return null
        })(t)
        return (r ? r.module.injector : n).get(e)
      }
      function Zi(
        e,
        t,
        n,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = Lr(t)
        return (
          e.children.forEach((s) => {
            ;(function bA(
              e,
              t,
              n,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null
              if (s && o.routeConfig === s.routeConfig) {
                const u = (function MA(e, t, n) {
                  if ('function' == typeof n) return n(e, t)
                  switch (n) {
                    case 'pathParamsChange':
                      return !Un(e.url, t.url)
                    case 'pathParamsOrQueryParamsChange':
                      return (
                        !Un(e.url, t.url) || !Vt(e.queryParams, t.queryParams)
                      )
                    case 'always':
                      return !0
                    case 'paramsOrQueryParamsChange':
                      return !lc(e, t) || !Vt(e.queryParams, t.queryParams)
                    default:
                      return !lc(e, t)
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers)
                u
                  ? i.canActivateChecks.push(new lv(r))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  Zi(e, t, o.component ? (a ? a.children : null) : n, r, i),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new Ls(a.outlet.component, s))
              } else
                s && Qi(t, a, i),
                  i.canActivateChecks.push(new lv(r)),
                  Zi(e, null, o.component ? (a ? a.children : null) : n, r, i)
            })(s, o[s.value.outlet], n, r.concat([s.value]), i),
              delete o[s.value.outlet]
          }),
          Se(o, (s, a) => Qi(s, n.getContext(a), i)),
          i
        )
      }
      function Qi(e, t, n) {
        const r = Lr(e),
          i = e.value
        Se(r, (o, s) => {
          Qi(o, i.component ? (t ? t.children.getContext(s) : null) : t, n)
        }),
          n.canDeactivateChecks.push(
            new Ls(
              i.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              i
            )
          )
      }
      class NA {}
      function cv(e) {
        return new ye((t) => t.error(e))
      }
      class kA {
        constructor(t, n, r, i, o, s) {
          ;(this.rootComponentType = t),
            (this.config = n),
            (this.urlTree = r),
            (this.url = i),
            (this.paramsInheritanceStrategy = o),
            (this.relativeLinkResolution = s)
        }
        recognize() {
          const t = Ns(
              this.urlTree.root,
              [],
              [],
              this.config.filter((s) => void 0 === s.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            n = this.processSegmentGroup(this.config, t, V)
          if (null === n) return null
          const r = new xs(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              V,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            i = new nn(r, n),
            o = new Zy(this.url, i)
          return this.inheritParamsAndData(o._root), o
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Wy(n, this.paramsInheritanceStrategy)
          ;(n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((i) => this.inheritParamsAndData(i))
        }
        processSegmentGroup(t, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(t, n)
            : this.processSegment(t, n, n.segments, r)
        }
        processChildren(t, n) {
          const r = []
          for (const o of Object.keys(n.children)) {
            const s = n.children[o],
              a = rv(t, o),
              u = this.processSegmentGroup(a, s, o)
            if (null === u) return null
            r.push(...u)
          }
          const i = dv(r)
          return (
            (function LA(e) {
              e.sort((t, n) =>
                t.value.outlet === V
                  ? -1
                  : n.value.outlet === V
                  ? 1
                  : t.value.outlet.localeCompare(n.value.outlet)
              )
            })(i),
            i
          )
        }
        processSegment(t, n, r, i) {
          for (const o of t) {
            const s = this.processSegmentAgainstRoute(o, n, r, i)
            if (null !== s) return s
          }
          return sv(n, r, i) ? [] : null
        }
        processSegmentAgainstRoute(t, n, r, i) {
          if (t.redirectTo || !ov(t, n, r, i)) return null
          let o,
            s = [],
            a = []
          if ('**' === t.path) {
            const h = r.length > 0 ? Oy(r).parameters : {}
            o = new xs(
              r,
              h,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              pv(t),
              dt(t),
              t.component,
              t,
              fv(n),
              hv(n) + r.length,
              gv(t)
            )
          } else {
            const h = Os(n, t, r)
            if (!h.matched) return null
            ;(s = h.consumedSegments),
              (a = h.remainingSegments),
              (o = new xs(
                s,
                h.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                pv(t),
                dt(t),
                t.component,
                t,
                fv(n),
                hv(n) + s.length,
                gv(t)
              ))
          }
          const u = (function jA(e) {
              return e.children
                ? e.children
                : e.loadChildren
                ? e._loadedConfig.routes
                : []
            })(t),
            { segmentGroup: l, slicedSegments: c } = Ns(
              n,
              s,
              a,
              u.filter((h) => void 0 === h.redirectTo),
              this.relativeLinkResolution
            )
          if (0 === c.length && l.hasChildren()) {
            const h = this.processChildren(u, l)
            return null === h ? null : [new nn(o, h)]
          }
          if (0 === u.length && 0 === c.length) return [new nn(o, [])]
          const d = dt(t) === i,
            f = this.processSegment(u, l, c, d ? V : i)
          return null === f ? null : [new nn(o, f)]
        }
      }
      function VA(e) {
        const t = e.value.routeConfig
        return t && '' === t.path && void 0 === t.redirectTo
      }
      function dv(e) {
        const t = [],
          n = new Set()
        for (const r of e) {
          if (!VA(r)) {
            t.push(r)
            continue
          }
          const i = t.find((o) => r.value.routeConfig === o.value.routeConfig)
          void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r)
        }
        for (const r of n) {
          const i = dv(r.children)
          t.push(new nn(r.value, i))
        }
        return t.filter((r) => !n.has(r))
      }
      function fv(e) {
        let t = e
        for (; t._sourceSegment; ) t = t._sourceSegment
        return t
      }
      function hv(e) {
        let t = e,
          n = t._segmentIndexShift ? t._segmentIndexShift : 0
        for (; t._sourceSegment; )
          (t = t._sourceSegment),
            (n += t._segmentIndexShift ? t._segmentIndexShift : 0)
        return n - 1
      }
      function pv(e) {
        return e.data || {}
      }
      function gv(e) {
        return e.resolve || {}
      }
      function mv(e) {
        return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]
      }
      function yc(e) {
        return Bn((t) => {
          const n = e(t)
          return n ? Te(n).pipe(ne(() => t)) : k(t)
        })
      }
      class WA extends class qA {
        shouldDetach(t) {
          return !1
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1
        }
        retrieve(t) {
          return null
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig
        }
      } {}
      const vc = new W('ROUTES')
      class yv {
        constructor(t, n, r, i) {
          ;(this.injector = t),
            (this.compiler = n),
            (this.onLoadStartListener = r),
            (this.onLoadEndListener = i)
        }
        load(t, n) {
          if (n._loader$) return n._loader$
          this.onLoadStartListener && this.onLoadStartListener(n)
          const i = this.loadModuleFactory(n.loadChildren).pipe(
            ne((o) => {
              this.onLoadEndListener && this.onLoadEndListener(n)
              const s = o.create(t)
              return new hc(
                Py(s.injector.get(vc, void 0, x.Self | x.Optional)).map(gc),
                s
              )
            }),
            Cn((o) => {
              throw ((n._loader$ = void 0), o)
            })
          )
          return (n._loader$ = new oT(i, () => new Ht()).pipe(wy())), n._loader$
        }
        loadModuleFactory(t) {
          return Bt(t()).pipe(
            we((n) =>
              n instanceof kg ? k(n) : Te(this.compiler.compileModuleAsync(n))
            )
          )
        }
      }
      class QA {
        shouldProcessUrl(t) {
          return !0
        }
        extract(t) {
          return t
        }
        merge(t, n) {
          return t
        }
      }
      function YA(e) {
        throw e
      }
      function KA(e, t, n) {
        return t.parse('/')
      }
      function vv(e, t) {
        return k(null)
      }
      const JA = {
          paths: 'exact',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'exact',
        },
        XA = {
          paths: 'subset',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'subset',
        }
      let Xe = (() => {
        class e {
          constructor(n, r, i, o, s, a, u) {
            ;(this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = i),
              (this.location = o),
              (this.config = u),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new Ht()),
              (this.errorHandler = YA),
              (this.malformedUriErrorHandler = KA),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: vv,
                afterPreactivation: vv,
              }),
              (this.urlHandlingStrategy = new QA()),
              (this.routeReuseStrategy = new WA()),
              (this.onSameUrlNavigation = 'ignore'),
              (this.paramsInheritanceStrategy = 'emptyOnly'),
              (this.urlUpdateStrategy = 'deferred'),
              (this.relativeLinkResolution = 'corrected'),
              (this.canceledNavigationResolution = 'replace'),
              (this.ngModule = s.get(Kt)),
              (this.console = s.get(vm))
            const d = s.get(Ie)
            ;(this.isNgZoneEnabled = d instanceof Ie && Ie.isInAngularZone()),
              this.resetConfig(u),
              (this.currentUrlTree = (function MT() {
                return new Hn(new U([], {}), {}, null)
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new yv(
                s,
                a,
                (f) => this.triggerEvent(new Sy(f)),
                (f) => this.triggerEvent(new Ty(f))
              )),
              (this.routerState = qy(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new Mt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: 'imperative',
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations()
          }
          get browserPageId() {
            var n
            return null === (n = this.location.getState()) || void 0 === n
              ? void 0
              : n.ɵrouterPageId
          }
          setupNavigations(n) {
            const r = this.events
            return n.pipe(
              Nr((i) => 0 !== i.id),
              ne((i) =>
                Object.assign(Object.assign({}, i), {
                  extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
                })
              ),
              Bn((i) => {
                let o = !1,
                  s = !1
                return k(i).pipe(
                  Je((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.currentRawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null,
                    }
                  }),
                  Bn((a) => {
                    const u = this.browserUrlTree.toString(),
                      l =
                        !this.navigated ||
                        a.extractedUrl.toString() !== u ||
                        u !== this.currentUrlTree.toString()
                    if (
                      ('reload' === this.onSameUrlNavigation || l) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        Dv(a.source) && (this.browserUrlTree = a.extractedUrl),
                        k(a).pipe(
                          Bn((d) => {
                            const f = this.transitions.getValue()
                            return (
                              r.next(
                                new nc(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? $t
                                : Promise.resolve(d)
                            )
                          }),
                          (function _A(e, t, n, r) {
                            return Bn((i) =>
                              (function yA(e, t, n, r, i) {
                                return new vA(e, t, n, r, i).apply()
                              })(e, t, n, i.extractedUrl, r).pipe(
                                ne((o) =>
                                  Object.assign(Object.assign({}, i), {
                                    urlAfterRedirects: o,
                                  })
                                )
                              )
                            )
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          Je((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            )
                          }),
                          (function BA(e, t, n, r, i) {
                            return we((o) =>
                              (function FA(
                                e,
                                t,
                                n,
                                r,
                                i = 'emptyOnly',
                                o = 'legacy'
                              ) {
                                try {
                                  const s = new kA(e, t, n, r, i, o).recognize()
                                  return null === s ? cv(new NA()) : k(s)
                                } catch (s) {
                                  return cv(s)
                                }
                              })(
                                e,
                                t,
                                o.urlAfterRedirects,
                                n(o.urlAfterRedirects),
                                r,
                                i
                              ).pipe(
                                ne((s) =>
                                  Object.assign(Object.assign({}, o), {
                                    targetSnapshot: s,
                                  })
                                )
                              )
                            )
                          })(
                            this.rootComponentType,
                            this.config,
                            (d) => this.serializeUrl(d),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          Je((d) => {
                            if ('eager' === this.urlUpdateStrategy) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                )
                                this.setBrowserUrl(h, d)
                              }
                              this.browserUrlTree = d.urlAfterRedirects
                            }
                            const f = new fT(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            )
                            r.next(f)
                          })
                        )
                      )
                    if (
                      l &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: m,
                          extras: v,
                        } = a,
                        D = new nc(f, this.serializeUrl(h), p, m)
                      r.next(D)
                      const g = qy(h, this.rootComponentType).snapshot
                      return k(
                        Object.assign(Object.assign({}, a), {
                          targetSnapshot: g,
                          urlAfterRedirects: h,
                          extras: Object.assign(Object.assign({}, v), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })
                      )
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), $t
                  }),
                  yc((a) => {
                    const {
                      targetSnapshot: u,
                      id: l,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a
                    return this.hooks.beforePreactivation(u, {
                      navigationId: l,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    })
                  }),
                  Je((a) => {
                    const u = new hT(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    )
                    this.triggerEvent(u)
                  }),
                  ne((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: CA(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function IA(e, t) {
                    return we((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: i,
                        guards: {
                          canActivateChecks: o,
                          canDeactivateChecks: s,
                        },
                      } = n
                      return 0 === s.length && 0 === o.length
                        ? k(
                            Object.assign(Object.assign({}, n), {
                              guardsResult: !0,
                            })
                          )
                        : (function SA(e, t, n, r) {
                            return Te(e).pipe(
                              we((i) =>
                                (function OA(e, t, n, r, i) {
                                  const o =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null
                                  return o && 0 !== o.length
                                    ? k(
                                        o.map((a) => {
                                          const u = js(a, t, i)
                                          let l
                                          if (
                                            (function sA(e) {
                                              return e && wn(e.canDeactivate)
                                            })(u)
                                          )
                                            l = Bt(u.canDeactivate(e, t, n, r))
                                          else {
                                            if (!wn(u))
                                              throw new Error(
                                                'Invalid CanDeactivate guard'
                                              )
                                            l = Bt(u(e, t, n, r))
                                          }
                                          return l.pipe(Fr())
                                        })
                                      ).pipe(Gi())
                                    : k(!0)
                                })(i.component, i.route, n, t, r)
                              ),
                              Fr((i) => !0 !== i, !0)
                            )
                          })(s, r, i, e).pipe(
                            we((a) =>
                              a &&
                              (function nA(e) {
                                return 'boolean' == typeof e
                              })(a)
                                ? (function TA(e, t, n, r) {
                                    return Te(t).pipe(
                                      ji((i) =>
                                        Xl(
                                          (function xA(e, t) {
                                            return (
                                              null !== e && t && t(new yT(e)),
                                              k(!0)
                                            )
                                          })(i.route.parent, r),
                                          (function AA(e, t) {
                                            return (
                                              null !== e && t && t(new DT(e)),
                                              k(!0)
                                            )
                                          })(i.route, r),
                                          (function PA(e, t, n) {
                                            const r = t[t.length - 1],
                                              o = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function wA(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  Cy(() =>
                                                    k(
                                                      s.guards.map((u) => {
                                                        const l = js(
                                                          u,
                                                          s.node,
                                                          n
                                                        )
                                                        let c
                                                        if (
                                                          (function oA(e) {
                                                            return (
                                                              e &&
                                                              wn(
                                                                e.canActivateChild
                                                              )
                                                            )
                                                          })(l)
                                                        )
                                                          c = Bt(
                                                            l.canActivateChild(
                                                              r,
                                                              e
                                                            )
                                                          )
                                                        else {
                                                          if (!wn(l))
                                                            throw new Error(
                                                              'Invalid CanActivateChild guard'
                                                            )
                                                          c = Bt(l(r, e))
                                                        }
                                                        return c.pipe(Fr())
                                                      })
                                                    ).pipe(Gi())
                                                  )
                                                )
                                            return k(o).pipe(Gi())
                                          })(e, i.path, n),
                                          (function RA(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null
                                            if (!r || 0 === r.length)
                                              return k(!0)
                                            const i = r.map((o) =>
                                              Cy(() => {
                                                const s = js(o, t, n)
                                                let a
                                                if (
                                                  (function iA(e) {
                                                    return (
                                                      e && wn(e.canActivate)
                                                    )
                                                  })(s)
                                                )
                                                  a = Bt(s.canActivate(t, e))
                                                else {
                                                  if (!wn(s))
                                                    throw new Error(
                                                      'Invalid CanActivate guard'
                                                    )
                                                  a = Bt(s(t, e))
                                                }
                                                return a.pipe(Fr())
                                              })
                                            )
                                            return k(i).pipe(Gi())
                                          })(e, i.route, n)
                                        )
                                      ),
                                      Fr((i) => !0 !== i, !0)
                                    )
                                  })(r, o, e, t)
                                : k(a)
                            ),
                            ne((a) =>
                              Object.assign(Object.assign({}, n), {
                                guardsResult: a,
                              })
                            )
                          )
                    })
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  Je((a) => {
                    if ($n(a.guardsResult)) {
                      const l = rc(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      )
                      throw ((l.url = a.guardsResult), l)
                    }
                    const u = new pT(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    )
                    this.triggerEvent(u)
                  }),
                  Nr(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ''),
                      !1)
                  ),
                  yc((a) => {
                    if (a.guards.canActivateChecks.length)
                      return k(a).pipe(
                        Je((u) => {
                          const l = new gT(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          )
                          this.triggerEvent(l)
                        }),
                        Bn((u) => {
                          let l = !1
                          return k(u).pipe(
                            (function HA(e, t) {
                              return we((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: i },
                                } = n
                                if (!i.length) return k(n)
                                let o = 0
                                return Te(i).pipe(
                                  ji((s) =>
                                    (function UA(e, t, n, r) {
                                      return (function $A(e, t, n, r) {
                                        const i = mv(e)
                                        if (0 === i.length) return k({})
                                        const o = {}
                                        return Te(i).pipe(
                                          we((s) =>
                                            (function zA(e, t, n, r) {
                                              const i = js(e, t, r)
                                              return Bt(
                                                i.resolve
                                                  ? i.resolve(t, n)
                                                  : i(t, n)
                                              )
                                            })(e[s], t, n, r).pipe(
                                              Je((a) => {
                                                o[s] = a
                                              })
                                            )
                                          ),
                                          tc(1),
                                          we(() =>
                                            mv(o).length === i.length
                                              ? k(o)
                                              : $t
                                          )
                                        )
                                      })(e._resolve, e, t, r).pipe(
                                        ne(
                                          (o) => (
                                            (e._resolvedData = o),
                                            (e.data = Object.assign(
                                              Object.assign({}, e.data),
                                              Wy(e, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      )
                                    })(s.route, r, e, t)
                                  ),
                                  Je(() => o++),
                                  tc(1),
                                  we((s) => (o === i.length ? k(n) : $t))
                                )
                              })
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            Je({
                              next: () => (l = !0),
                              complete: () => {
                                l ||
                                  (this.restoreHistory(u),
                                  this.cancelNavigationTransition(
                                    u,
                                    "At least one route resolver didn't emit any value."
                                  ))
                              },
                            })
                          )
                        }),
                        Je((u) => {
                          const l = new mT(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          )
                          this.triggerEvent(l)
                        })
                      )
                  }),
                  yc((a) => {
                    const {
                      targetSnapshot: u,
                      id: l,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a
                    return this.hooks.afterPreactivation(u, {
                      navigationId: l,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    })
                  }),
                  ne((a) => {
                    const u = (function $T(e, t, n) {
                      const r = Ui(e, t._root, n ? n._root : void 0)
                      return new Gy(r, t)
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    )
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: u,
                    })
                  }),
                  Je((a) => {
                    ;(this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      'deferred' === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects))
                  }),
                  ((e, t, n) =>
                    ne(
                      (r) => (
                        new eA(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  Je({
                    next() {
                      o = !0
                    },
                    complete() {
                      o = !0
                    },
                  }),
                  (function cT(e) {
                    return be((t, n) => {
                      try {
                        t.subscribe(n)
                      } finally {
                        n.add(e)
                      }
                    })
                  })(() => {
                    var a
                    o ||
                      s ||
                      this.cancelNavigationTransition(
                        i,
                        `Navigation ID ${i.id} is not equal to the current navigation id ${this.navigationId}`
                      ),
                      (null === (a = this.currentNavigation) || void 0 === a
                        ? void 0
                        : a.id) === i.id && (this.currentNavigation = null)
                  }),
                  Cn((a) => {
                    if (
                      ((s = !0),
                      (function wT(e) {
                        return e && e[xy]
                      })(a))
                    ) {
                      const u = $n(a.url)
                      u || ((this.navigated = !0), this.restoreHistory(i, !0))
                      const l = new Iy(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a.message
                      )
                      r.next(l),
                        u
                          ? setTimeout(() => {
                              const c = this.urlHandlingStrategy.merge(
                                  a.url,
                                  this.rawUrlTree
                                ),
                                d = {
                                  skipLocationChange:
                                    i.extras.skipLocationChange,
                                  replaceUrl:
                                    'eager' === this.urlUpdateStrategy ||
                                    Dv(i.source),
                                }
                              this.scheduleNavigation(
                                c,
                                'imperative',
                                null,
                                d,
                                {
                                  resolve: i.resolve,
                                  reject: i.reject,
                                  promise: i.promise,
                                }
                              )
                            }, 0)
                          : i.resolve(!1)
                    } else {
                      this.restoreHistory(i, !0)
                      const u = new dT(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a
                      )
                      r.next(u)
                      try {
                        i.resolve(this.errorHandler(a))
                      } catch (l) {
                        i.reject(l)
                      }
                    }
                    return $t
                  })
                )
              })
            )
          }
          resetRootComponentType(n) {
            ;(this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType)
          }
          setTransition(n) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.transitions.value), n)
            )
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 })
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = 'popstate' === n.type ? 'popstate' : 'hashchange'
                'popstate' === r &&
                  setTimeout(() => {
                    var i
                    const o = { replaceUrl: !0 },
                      s = (
                        null === (i = n.state) || void 0 === i
                          ? void 0
                          : i.navigationId
                      )
                        ? n.state
                        : null
                    if (s) {
                      const u = Object.assign({}, s)
                      delete u.navigationId,
                        delete u.ɵrouterPageId,
                        0 !== Object.keys(u).length && (o.state = u)
                    }
                    const a = this.parseUrl(n.url)
                    this.scheduleNavigation(a, r, s, o)
                  }, 0)
              }))
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree)
          }
          getCurrentNavigation() {
            return this.currentNavigation
          }
          triggerEvent(n) {
            this.events.next(n)
          }
          resetConfig(n) {
            nv(n),
              (this.config = n.map(gc)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1)
          }
          ngOnDestroy() {
            this.dispose()
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0)
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: i,
                queryParams: o,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = i || this.routerState.root,
              c = u ? this.currentUrlTree.fragment : s
            let d = null
            switch (a) {
              case 'merge':
                d = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  o
                )
                break
              case 'preserve':
                d = this.currentUrlTree.queryParams
                break
              default:
                d = o || null
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              (function qT(e, t, n, r, i) {
                if (0 === n.length) return cc(t.root, t.root, t.root, r, i)
                const o = (function WT(e) {
                  if ('string' == typeof e[0] && 1 === e.length && '/' === e[0])
                    return new Ky(!0, 0, e)
                  let t = 0,
                    n = !1
                  const r = e.reduce((i, o, s) => {
                    if ('object' == typeof o && null != o) {
                      if (o.outlets) {
                        const a = {}
                        return (
                          Se(o.outlets, (u, l) => {
                            a[l] = 'string' == typeof u ? u.split('/') : u
                          }),
                          [...i, { outlets: a }]
                        )
                      }
                      if (o.segmentPath) return [...i, o.segmentPath]
                    }
                    return 'string' != typeof o
                      ? [...i, o]
                      : 0 === s
                      ? (o.split('/').forEach((a, u) => {
                          ;(0 == u && '.' === a) ||
                            (0 == u && '' === a
                              ? (n = !0)
                              : '..' === a
                              ? t++
                              : '' != a && i.push(a))
                        }),
                        i)
                      : [...i, o]
                  }, [])
                  return new Ky(n, t, r)
                })(n)
                if (o.toRoot()) return cc(t.root, t.root, new U([], {}), r, i)
                const s = (function ZT(e, t, n) {
                    if (e.isAbsolute) return new dc(t.root, !0, 0)
                    if (-1 === n.snapshot._lastPathIndex) {
                      const o = n.snapshot._urlSegment
                      return new dc(o, o === t.root, 0)
                    }
                    const r = Rs(e.commands[0]) ? 0 : 1
                    return (function QT(e, t, n) {
                      let r = e,
                        i = t,
                        o = n
                      for (; o > i; ) {
                        if (((o -= i), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'")
                        i = r.segments.length
                      }
                      return new dc(r, !1, i - o)
                    })(
                      n.snapshot._urlSegment,
                      n.snapshot._lastPathIndex + r,
                      e.numberOfDoubleDots
                    )
                  })(o, t, e),
                  a = s.processChildren
                    ? Ps(s.segmentGroup, s.index, o.commands)
                    : Jy(s.segmentGroup, s.index, o.commands)
                return cc(t.root, s.segmentGroup, a, r, i)
              })(l, this.currentUrlTree, n, d, null != c ? c : null)
            )
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const i = $n(n) ? n : this.parseUrl(n),
              o = this.urlHandlingStrategy.merge(i, this.rawUrlTree)
            return this.scheduleNavigation(o, 'imperative', null, r)
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function ex(e) {
                for (let t = 0; t < e.length; t++) {
                  const n = e[t]
                  if (null == n)
                    throw new Error(
                      `The requested path contains ${n} segment at index ${t}`
                    )
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            )
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n)
          }
          parseUrl(n) {
            let r
            try {
              r = this.urlSerializer.parse(n)
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, n)
            }
            return r
          }
          isActive(n, r) {
            let i
            if (
              ((i =
                !0 === r
                  ? Object.assign({}, JA)
                  : !1 === r
                  ? Object.assign({}, XA)
                  : r),
              $n(n))
            )
              return Fy(this.currentUrlTree, n, i)
            const o = this.parseUrl(n)
            return Fy(this.currentUrlTree, o, i)
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, i) => {
              const o = n[i]
              return null != o && (r[i] = o), r
            }, {})
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                ;(this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new Vi(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  n.resolve(!0)
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`)
              }
            )
          }
          scheduleNavigation(n, r, i, o, s) {
            var a, u
            if (this.disposed) return Promise.resolve(!1)
            let l, c, d
            s
              ? ((l = s.resolve), (c = s.reject), (d = s.promise))
              : (d = new Promise((p, m) => {
                  ;(l = p), (c = m)
                }))
            const f = ++this.navigationId
            let h
            return (
              'computed' === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (i = this.location.getState()),
                  (h =
                    i && i.ɵrouterPageId
                      ? i.ɵrouterPageId
                      : o.replaceUrl || o.skipLocationChange
                      ? null !== (a = this.browserPageId) && void 0 !== a
                        ? a
                        : 0
                      : (null !== (u = this.browserPageId) && void 0 !== u
                          ? u
                          : 0) + 1))
                : (h = 0),
              this.setTransition({
                id: f,
                targetPageId: h,
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: o,
                resolve: l,
                reject: c,
                promise: d,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              d.catch((p) => Promise.reject(p))
            )
          }
          setBrowserUrl(n, r) {
            const i = this.urlSerializer.serialize(n),
              o = Object.assign(
                Object.assign({}, r.extras.state),
                this.generateNgRouterState(r.id, r.targetPageId)
              )
            this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl
              ? this.location.replaceState(i, '', o)
              : this.location.go(i, '', o)
          }
          restoreHistory(n, r = !1) {
            var i, o
            if ('computed' === this.canceledNavigationResolution) {
              const s = this.currentPageId - n.targetPageId
              ;('popstate' !== n.source &&
                'eager' !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (i = this.currentNavigation) || void 0 === i
                    ? void 0
                    : i.finalUrl)) ||
              0 === s
                ? this.currentUrlTree ===
                    (null === (o = this.currentNavigation) || void 0 === o
                      ? void 0
                      : o.finalUrl) &&
                  0 === s &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(s)
            } else
              'replace' === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree())
          }
          resetState(n) {
            ;(this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ))
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              '',
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            )
          }
          cancelNavigationTransition(n, r) {
            const i = new Iy(n.id, this.serializeUrl(n.extractedUrl), r)
            this.triggerEvent(i), n.resolve(!1)
          }
          generateNgRouterState(n, r) {
            return 'computed' === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n }
          }
        }
        return (
          (e.ɵfac = function (n) {
            ku()
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      function Dv(e) {
        return 'imperative' !== e
      }
      class _v {}
      class Cv {
        preload(t, n) {
          return k(null)
        }
      }
      let wv = (() => {
          class e {
            constructor(n, r, i, o) {
              ;(this.router = n),
                (this.injector = i),
                (this.preloadingStrategy = o),
                (this.loader = new yv(
                  i,
                  r,
                  (u) => n.triggerEvent(new Sy(u)),
                  (u) => n.triggerEvent(new Ty(u))
                ))
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Nr((n) => n instanceof Vi),
                  ji(() => this.preload())
                )
                .subscribe(() => {})
            }
            preload() {
              const n = this.injector.get(Kt)
              return this.processRoutes(n, this.router.config)
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe()
            }
            processRoutes(n, r) {
              const i = []
              for (const o of r)
                if (o.loadChildren && !o.canLoad && o._loadedConfig) {
                  const s = o._loadedConfig
                  i.push(this.processRoutes(s.module, s.routes))
                } else
                  o.loadChildren && !o.canLoad
                    ? i.push(this.preloadConfig(n, o))
                    : o.children && i.push(this.processRoutes(n, o.children))
              return Te(i).pipe(
                $r(),
                ne((o) => {})
              )
            }
            preloadConfig(n, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? k(r._loadedConfig)
                  : this.loader.load(n.injector, r)
                ).pipe(
                  we(
                    (o) => (
                      (r._loadedConfig = o),
                      this.processRoutes(o.module, o.routes)
                    )
                  )
                )
              )
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S(Xe), S(Dm), S($e), S(_v))
            }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac })),
            e
          )
        })(),
        Cc = (() => {
          class e {
            constructor(n, r, i = {}) {
              ;(this.router = n),
                (this.viewportScroller = r),
                (this.options = i),
                (this.lastId = 0),
                (this.lastSource = 'imperative'),
                (this.restoredId = 0),
                (this.store = {}),
                (i.scrollPositionRestoration =
                  i.scrollPositionRestoration || 'disabled'),
                (i.anchorScrolling = i.anchorScrolling || 'disabled')
            }
            init() {
              'disabled' !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration('manual'),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents())
            }
            createScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof nc
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = n.navigationTrigger),
                    (this.restoredId = n.restoredState
                      ? n.restoredState.navigationId
                      : 0))
                  : n instanceof Vi &&
                    ((this.lastId = n.id),
                    this.scheduleScrollEvent(
                      n,
                      this.router.parseUrl(n.urlAfterRedirects).fragment
                    ))
              })
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof Ay &&
                  (n.position
                    ? 'top' === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : 'enabled' === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(n.position)
                    : n.anchor && 'enabled' === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(n.anchor)
                    : 'disabled' !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]))
              })
            }
            scheduleScrollEvent(n, r) {
              this.router.triggerEvent(
                new Ay(
                  n,
                  'popstate' === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              )
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe()
            }
          }
          return (
            (e.ɵfac = function (n) {
              ku()
            }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac })),
            e
          )
        })()
      const zn = new W('ROUTER_CONFIGURATION'),
        Ev = new W('ROUTER_FORROOT_GUARD'),
        ix = [
          Pl,
          { provide: Vy, useClass: By },
          {
            provide: Xe,
            useFactory: function lx(e, t, n, r, i, o, s = {}, a, u) {
              const l = new Xe(null, e, t, n, r, i, Py(o))
              return (
                a && (l.urlHandlingStrategy = a),
                u && (l.routeReuseStrategy = u),
                (function cx(e, t) {
                  e.errorHandler && (t.errorHandler = e.errorHandler),
                    e.malformedUriErrorHandler &&
                      (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
                    e.onSameUrlNavigation &&
                      (t.onSameUrlNavigation = e.onSameUrlNavigation),
                    e.paramsInheritanceStrategy &&
                      (t.paramsInheritanceStrategy =
                        e.paramsInheritanceStrategy),
                    e.relativeLinkResolution &&
                      (t.relativeLinkResolution = e.relativeLinkResolution),
                    e.urlUpdateStrategy &&
                      (t.urlUpdateStrategy = e.urlUpdateStrategy),
                    e.canceledNavigationResolution &&
                      (t.canceledNavigationResolution =
                        e.canceledNavigationResolution)
                })(s, l),
                s.enableTracing &&
                  l.events.subscribe((c) => {
                    var d, f
                    null === (d = console.group) ||
                      void 0 === d ||
                      d.call(console, `Router Event: ${c.constructor.name}`),
                      console.log(c.toString()),
                      console.log(c),
                      null === (f = console.groupEnd) ||
                        void 0 === f ||
                        f.call(console)
                  }),
                l
              )
            },
            deps: [
              Vy,
              qi,
              Pl,
              $e,
              Dm,
              vc,
              zn,
              [class ZA {}, new cn()],
              [class GA {}, new cn()],
            ],
          },
          qi,
          {
            provide: jr,
            useFactory: function dx(e) {
              return e.routerState.root
            },
            deps: [Xe],
          },
          wv,
          Cv,
          class rx {
            preload(t, n) {
              return n().pipe(Cn(() => k(null)))
            }
          },
          { provide: zn, useValue: { enableTracing: !1 } },
        ]
      function ox() {
        return new bm('Router', Xe)
      }
      let bv = (() => {
        class e {
          constructor(n, r) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                ix,
                Mv(n),
                {
                  provide: Ev,
                  useFactory: ux,
                  deps: [[Xe, new cn(), new ui()]],
                },
                { provide: zn, useValue: r || {} },
                {
                  provide: Or,
                  useFactory: ax,
                  deps: [Vn, [new Io(Rl), new cn()], zn],
                },
                { provide: Cc, useFactory: sx, deps: [Xe, aS, zn] },
                {
                  provide: _v,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : Cv,
                },
                { provide: bm, multi: !0, useFactory: ox },
                [
                  wc,
                  { provide: pl, multi: !0, useFactory: fx, deps: [wc] },
                  { provide: Iv, useFactory: hx, deps: [wc] },
                  { provide: ym, multi: !0, useExisting: Iv },
                ],
              ],
            }
          }
          static forChild(n) {
            return { ngModule: e, providers: [Mv(n)] }
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(Ev, 8), S(Xe, 8))
          }),
          (e.ɵmod = qt({ type: e })),
          (e.ɵinj = St({})),
          e
        )
      })()
      function sx(e, t, n) {
        return n.scrollOffset && t.setOffset(n.scrollOffset), new Cc(e, t, n)
      }
      function ax(e, t, n = {}) {
        return n.useHash ? new UM(e, t) : new zm(e, t)
      }
      function ux(e) {
        return 'guarded'
      }
      function Mv(e) {
        return [
          { provide: CD, multi: !0, useValue: e },
          { provide: vc, multi: !0, useValue: e },
        ]
      }
      let wc = (() => {
        class e {
          constructor(n) {
            ;(this.injector = n),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new Ht())
          }
          appInitializer() {
            return this.injector.get(VM, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0)
              let r = null
              const i = new Promise((a) => (r = a)),
                o = this.injector.get(Xe),
                s = this.injector.get(zn)
              return (
                'disabled' === s.initialNavigation
                  ? (o.setUpLocationChangeListener(), r(!0))
                  : 'enabled' === s.initialNavigation ||
                    'enabledBlocking' === s.initialNavigation
                  ? ((o.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? k(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    o.initialNavigation())
                  : r(!0),
                i
              )
            })
          }
          bootstrapListener(n) {
            const r = this.injector.get(zn),
              i = this.injector.get(wv),
              o = this.injector.get(Cc),
              s = this.injector.get(Xe),
              a = this.injector.get(El)
            n === a.components[0] &&
              (('enabledNonBlocking' === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                s.initialNavigation(),
              i.setUpPreloading(),
              o.init(),
              s.resetRootComponentType(a.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete())
          }
          ngOnDestroy() {
            this.destroyed = !0
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S($e))
          }),
          (e.ɵprov = $({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      function fx(e) {
        return e.appInitializer.bind(e)
      }
      function hx(e) {
        return e.bootstrapListener.bind(e)
      }
      const Iv = new W('Router Initializer'),
        gx = [
          {
            path: '',
            component: (() => {
              class e {
                constructor() {}
                ngOnInit() {}
              }
              return (
                (e.ɵfac = function (n) {
                  return new (n || e)()
                }),
                (e.ɵcmp = qr({
                  type: e,
                  selectors: [['app-login']],
                  decls: 8,
                  vars: 0,
                  consts: [
                    ['for', 'name'],
                    ['type', 'text', 'id', 'name'],
                    ['for', 'age'],
                    ['type', 'text', 'id', 'age'],
                  ],
                  template: function (n, r) {
                    1 & n &&
                      (_(0, 'div')(1, 'label', 0),
                      G(2, 'Name'),
                      E(),
                      H(3, 'input', 1),
                      E(),
                      _(4, 'div')(5, 'label', 2),
                      G(6, 'Age'),
                      E(),
                      H(7, 'input', 3),
                      E())
                  },
                  styles: [''],
                })),
                e
              )
            })(),
          },
        ]
      let mx = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)()
          }),
          (e.ɵmod = qt({ type: e })),
          (e.ɵinj = St({ imports: [[bv.forRoot(gx)], bv] })),
          e
        )
      })()
      function yx(e, t) {
        1 & e && (_(0, 'pre'), G(1, 'ng generate component xyz'), E())
      }
      function vx(e, t) {
        1 & e && (_(0, 'pre'), G(1, 'ng add @angular/material'), E())
      }
      function Dx(e, t) {
        1 & e && (_(0, 'pre'), G(1, 'ng add @angular/pwa'), E())
      }
      function _x(e, t) {
        1 & e && (_(0, 'pre'), G(1, 'ng add _____'), E())
      }
      function Cx(e, t) {
        1 & e && (_(0, 'pre'), G(1, 'ng test'), E())
      }
      function wx(e, t) {
        1 & e && (_(0, 'pre'), G(1, 'ng build'), E())
      }
      let Ex = (() => {
          class e {
            constructor() {
              this.title = 'funny-dairy'
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵcmp = qr({
              type: e,
              selectors: [['app-root']],
              decls: 152,
              vars: 7,
              consts: [
                ['role', 'banner', 1, 'toolbar'],
                [
                  'width',
                  '40',
                  'alt',
                  'Angular Logo',
                  'src',
                  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==',
                ],
                [1, 'spacer'],
                [
                  'aria-label',
                  'Angular on twitter',
                  'target',
                  '_blank',
                  'rel',
                  'noopener',
                  'href',
                  'https://twitter.com/angular',
                  'title',
                  'Twitter',
                ],
                [
                  'id',
                  'twitter-logo',
                  'height',
                  '24',
                  'data-name',
                  'Logo',
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'viewBox',
                  '0 0 400 400',
                ],
                ['width', '400', 'height', '400', 'fill', 'none'],
                [
                  'd',
                  'M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23',
                  'fill',
                  '#fff',
                ],
                [
                  'aria-label',
                  'Angular on YouTube',
                  'target',
                  '_blank',
                  'rel',
                  'noopener',
                  'href',
                  'https://youtube.com/angular',
                  'title',
                  'YouTube',
                ],
                [
                  'id',
                  'youtube-logo',
                  'height',
                  '24',
                  'width',
                  '24',
                  'data-name',
                  'Logo',
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'viewBox',
                  '0 0 24 24',
                  'fill',
                  '#fff',
                ],
                ['d', 'M0 0h24v24H0V0z', 'fill', 'none'],
                [
                  'd',
                  'M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z',
                ],
                ['role', 'main', 1, 'content'],
                [1, 'card', 'highlight-card', 'card-small'],
                [
                  'id',
                  'rocket',
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'width',
                  '101.678',
                  'height',
                  '101.678',
                  'viewBox',
                  '0 0 101.678 101.678',
                ],
                [
                  'id',
                  'Group_83',
                  'data-name',
                  'Group 83',
                  'transform',
                  'translate(-141 -696)',
                ],
                [
                  'id',
                  'Ellipse_8',
                  'data-name',
                  'Ellipse 8',
                  'cx',
                  '50.839',
                  'cy',
                  '50.839',
                  'r',
                  '50.839',
                  'transform',
                  'translate(141 696)',
                  'fill',
                  '#dd0031',
                ],
                [
                  'id',
                  'Group_47',
                  'data-name',
                  'Group 47',
                  'transform',
                  'translate(165.185 720.185)',
                ],
                [
                  'id',
                  'Path_33',
                  'data-name',
                  'Path 33',
                  'd',
                  'M3.4,42.615a3.084,3.084,0,0,0,3.553,3.553,21.419,21.419,0,0,0,12.215-6.107L9.511,30.4A21.419,21.419,0,0,0,3.4,42.615Z',
                  'transform',
                  'translate(0.371 3.363)',
                  'fill',
                  '#fff',
                ],
                [
                  'id',
                  'Path_34',
                  'data-name',
                  'Path 34',
                  'd',
                  'M53.3,3.221A3.09,3.09,0,0,0,50.081,0,48.227,48.227,0,0,0,18.322,13.437c-6-1.666-14.991-1.221-18.322,7.218A33.892,33.892,0,0,1,9.439,25.1l-.333.666a3.013,3.013,0,0,0,.555,3.553L23.985,43.641a2.9,2.9,0,0,0,3.553.555l.666-.333A33.892,33.892,0,0,1,32.647,53.3c8.55-3.664,8.884-12.326,7.218-18.322A48.227,48.227,0,0,0,53.3,3.221ZM34.424,9.772a6.439,6.439,0,1,1,9.106,9.106,6.368,6.368,0,0,1-9.106,0A6.467,6.467,0,0,1,34.424,9.772Z',
                  'transform',
                  'translate(0 0.005)',
                  'fill',
                  '#fff',
                ],
                [
                  'id',
                  'rocket-smoke',
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'width',
                  '516.119',
                  'height',
                  '1083.632',
                  'viewBox',
                  '0 0 516.119 1083.632',
                ],
                [
                  'id',
                  'Path_40',
                  'data-name',
                  'Path 40',
                  'd',
                  'M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z',
                  'transform',
                  'translate(-147.025 -140.939)',
                  'fill',
                  '#f5f5f5',
                ],
                [1, 'card-container'],
                [
                  'target',
                  '_blank',
                  'rel',
                  'noopener',
                  'href',
                  'https://angular.io/tutorial',
                  1,
                  'card',
                ],
                [
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'width',
                  '24',
                  'height',
                  '24',
                  'viewBox',
                  '0 0 24 24',
                  1,
                  'material-icons',
                ],
                [
                  'd',
                  'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
                ],
                ['d', 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'],
                [
                  'target',
                  '_blank',
                  'rel',
                  'noopener',
                  'href',
                  'https://angular.io/cli',
                  1,
                  'card',
                ],
                [
                  'd',
                  'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
                ],
                [
                  'target',
                  '_blank',
                  'rel',
                  'noopener',
                  'href',
                  'https://material.angular.io',
                  1,
                  'card',
                ],
                [
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'width',
                  '21.813',
                  'height',
                  '23.453',
                  'viewBox',
                  '0 0 21.813 23.453',
                  2,
                  'margin-right',
                  '8px',
                ],
                [
                  'd',
                  'M4099.584,972.736h0l-10.882,3.9,1.637,14.4,9.245,5.153,9.245-5.153,1.686-14.4Z',
                  'transform',
                  'translate(-4088.702 -972.736)',
                  'fill',
                  '#808080',
                ],
                [
                  'd',
                  'M4181.516,972.736v23.453l9.245-5.153,1.686-14.4Z',
                  'transform',
                  'translate(-4170.633 -972.736)',
                  'fill',
                  '#808080',
                ],
                [
                  'd',
                  'M4137.529,1076.127l-7.7-3.723,4.417-2.721,7.753,3.723Z',
                  'transform',
                  'translate(-4125.003 -1058.315)',
                  'fill',
                  '#ffe0b2',
                ],
                [
                  'd',
                  'M4137.529,1051.705l-7.7-3.723,4.417-2.721,7.753,3.723Z',
                  'transform',
                  'translate(-4125.003 -1036.757)',
                  'fill',
                  '#fff3e0',
                ],
                [
                  'd',
                  'M4137.529,1027.283l-7.7-3.723,4.417-2.721,7.753,3.723Z',
                  'transform',
                  'translate(-4125.003 -1015.199)',
                  'fill',
                  '#fff',
                ],
                [
                  'target',
                  '_blank',
                  'rel',
                  'noopener',
                  'href',
                  'https://blog.angular.io/',
                  1,
                  'card',
                ],
                [
                  'd',
                  'M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z',
                ],
                [
                  'target',
                  '_blank',
                  'rel',
                  'noopener',
                  'href',
                  'https://angular.io/devtools/',
                  1,
                  'card',
                ],
                [
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'enable-background',
                  'new 0 0 24 24',
                  'height',
                  '24px',
                  'viewBox',
                  '0 0 24 24',
                  'width',
                  '24px',
                  'fill',
                  '#000000',
                  1,
                  'material-icons',
                ],
                ['fill', 'none', 'height', '24', 'width', '24'],
                [
                  'd',
                  'M14.73,13.31C15.52,12.24,16,10.93,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.43,0,2.74-0.48,3.81-1.27L19.59,21L21,19.59L14.73,13.31z M9.5,14C7.01,14,5,11.99,5,9.5S7.01,5,9.5,5S14,7.01,14,9.5 S11.99,14,9.5,14z',
                ],
                [
                  'points',
                  '10.29,8.44 9.5,6 8.71,8.44 6.25,8.44 8.26,10.03 7.49,12.5 9.5,10.97 11.51,12.5 10.74,10.03 12.75,8.44',
                ],
                ['type', 'hidden'],
                ['selection', ''],
                ['tabindex', '0', 1, 'card', 'card-small', 3, 'click'],
                ['d', 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'],
                [1, 'terminal', 3, 'ngSwitch'],
                [4, 'ngSwitchDefault'],
                [4, 'ngSwitchCase'],
                [
                  'title',
                  'Find a Local Meetup',
                  'href',
                  'https://www.meetup.com/find/?keywords=angular',
                  'target',
                  '_blank',
                  'rel',
                  'noopener',
                  1,
                  'circle-link',
                ],
                [
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'width',
                  '24.607',
                  'height',
                  '23.447',
                  'viewBox',
                  '0 0 24.607 23.447',
                ],
                [
                  'id',
                  'logo--mSwarm',
                  'd',
                  'M21.221,14.95A4.393,4.393,0,0,1,17.6,19.281a4.452,4.452,0,0,1-.8.069c-.09,0-.125.035-.154.117a2.939,2.939,0,0,1-2.506,2.091,2.868,2.868,0,0,1-2.248-.624.168.168,0,0,0-.245-.005,3.926,3.926,0,0,1-2.589.741,4.015,4.015,0,0,1-3.7-3.347,2.7,2.7,0,0,1-.043-.38c0-.106-.042-.146-.143-.166a3.524,3.524,0,0,1-1.516-.69A3.623,3.623,0,0,1,2.23,14.557a3.66,3.66,0,0,1,1.077-3.085.138.138,0,0,0,.026-.2,3.348,3.348,0,0,1-.451-1.821,3.46,3.46,0,0,1,2.749-3.28.44.44,0,0,0,.355-.281,5.072,5.072,0,0,1,3.863-3,5.028,5.028,0,0,1,3.555.666.31.31,0,0,0,.271.03A4.5,4.5,0,0,1,18.3,4.7a4.4,4.4,0,0,1,1.334,2.751,3.658,3.658,0,0,1,.022.706.131.131,0,0,0,.1.157,2.432,2.432,0,0,1,1.574,1.645,2.464,2.464,0,0,1-.7,2.616c-.065.064-.051.1-.014.166A4.321,4.321,0,0,1,21.221,14.95ZM13.4,14.607a2.09,2.09,0,0,0,1.409,1.982,4.7,4.7,0,0,0,1.275.221,1.807,1.807,0,0,0,.9-.151.542.542,0,0,0,.321-.545.558.558,0,0,0-.359-.534,1.2,1.2,0,0,0-.254-.078c-.262-.047-.526-.086-.787-.138a.674.674,0,0,1-.617-.75,3.394,3.394,0,0,1,.218-1.109c.217-.658.509-1.286.79-1.918a15.609,15.609,0,0,0,.745-1.86,1.95,1.95,0,0,0,.06-1.073,1.286,1.286,0,0,0-1.051-1.033,1.977,1.977,0,0,0-1.521.2.339.339,0,0,1-.446-.042c-.1-.092-.2-.189-.307-.284a1.214,1.214,0,0,0-1.643-.061,7.563,7.563,0,0,1-.614.512A.588.588,0,0,1,10.883,8c-.215-.115-.437-.215-.659-.316a2.153,2.153,0,0,0-.695-.248A2.091,2.091,0,0,0,7.541,8.562a9.915,9.915,0,0,0-.405.986c-.559,1.545-1.015,3.123-1.487,4.7a1.528,1.528,0,0,0,.634,1.777,1.755,1.755,0,0,0,1.5.211,1.35,1.35,0,0,0,.824-.858c.543-1.281,1.032-2.584,1.55-3.875.142-.355.28-.712.432-1.064a.548.548,0,0,1,.851-.24.622.622,0,0,1,.185.539,2.161,2.161,0,0,1-.181.621c-.337.852-.68,1.7-1.018,2.552a2.564,2.564,0,0,0-.173.528.624.624,0,0,0,.333.71,1.073,1.073,0,0,0,.814.034,1.22,1.22,0,0,0,.657-.655q.758-1.488,1.511-2.978.35-.687.709-1.37a1.073,1.073,0,0,1,.357-.434.43.43,0,0,1,.463-.016.373.373,0,0,1,.153.387.7.7,0,0,1-.057.236c-.065.157-.127.316-.2.469-.42.883-.846,1.763-1.262,2.648A2.463,2.463,0,0,0,13.4,14.607Zm5.888,6.508a1.09,1.09,0,0,0-2.179.006,1.09,1.09,0,0,0,2.179-.006ZM1.028,12.139a1.038,1.038,0,1,0,.01-2.075,1.038,1.038,0,0,0-.01,2.075ZM13.782.528a1.027,1.027,0,1,0-.011,2.055A1.027,1.027,0,0,0,13.782.528ZM22.21,6.95a.882.882,0,0,0-1.763.011A.882.882,0,0,0,22.21,6.95ZM4.153,4.439a.785.785,0,1,0,.787-.78A.766.766,0,0,0,4.153,4.439Zm8.221,18.22a.676.676,0,1,0-.677.666A.671.671,0,0,0,12.374,22.658ZM22.872,12.2a.674.674,0,0,0-.665.665.656.656,0,0,0,.655.643.634.634,0,0,0,.655-.644A.654.654,0,0,0,22.872,12.2ZM7.171-.123A.546.546,0,0,0,6.613.43a.553.553,0,1,0,1.106,0A.539.539,0,0,0,7.171-.123ZM24.119,9.234a.507.507,0,0,0-.493.488.494.494,0,0,0,.494.494.48.48,0,0,0,.487-.483A.491.491,0,0,0,24.119,9.234Zm-19.454,9.7a.5.5,0,0,0-.488-.488.491.491,0,0,0-.487.5.483.483,0,0,0,.491.479A.49.49,0,0,0,4.665,18.936Z',
                  'transform',
                  'translate(0 0.123)',
                  'fill',
                  '#f64060',
                ],
                [
                  'title',
                  'Join the Conversation on Discord',
                  'href',
                  'https://discord.gg/angular',
                  'target',
                  '_blank',
                  'rel',
                  'noopener',
                  1,
                  'circle-link',
                ],
                [
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'width',
                  '26',
                  'height',
                  '26',
                  'viewBox',
                  '0 0 245 240',
                ],
                [
                  'd',
                  'M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z',
                ],
                [
                  'd',
                  'M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z',
                ],
                [
                  'href',
                  'https://github.com/angular/angular',
                  'target',
                  '_blank',
                  'rel',
                  'noopener',
                ],
                [1, 'github-star-badge'],
                ['d', 'M0 0h24v24H0z', 'fill', 'none'],
                [
                  'd',
                  'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
                ],
                [
                  'd',
                  'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
                  'fill',
                  '#1976d2',
                ],
                [
                  'id',
                  'clouds',
                  'xmlns',
                  'http://www.w3.org/2000/svg',
                  'width',
                  '2611.084',
                  'height',
                  '485.677',
                  'viewBox',
                  '0 0 2611.084 485.677',
                ],
                [
                  'id',
                  'Path_39',
                  'data-name',
                  'Path 39',
                  'd',
                  'M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z',
                  'transform',
                  'translate(142.69 -634.312)',
                  'fill',
                  '#eee',
                ],
              ],
              template: function (n, r) {
                if (1 & n) {
                  const i = (function up() {
                    return y()
                  })()
                  _(0, 'div', 0),
                    H(1, 'img', 1),
                    _(2, 'span'),
                    G(3, 'Welcome'),
                    E(),
                    H(4, 'div', 2),
                    _(5, 'a', 3),
                    ie(),
                    _(6, 'svg', 4),
                    H(7, 'rect', 5)(8, 'path', 6),
                    E()(),
                    oe(),
                    _(9, 'a', 7),
                    ie(),
                    _(10, 'svg', 8),
                    H(11, 'path', 9)(12, 'path', 10),
                    E()()(),
                    oe(),
                    _(13, 'div', 11)(14, 'div', 12),
                    ie(),
                    _(15, 'svg', 13)(16, 'title'),
                    G(17, 'Rocket Ship'),
                    E(),
                    _(18, 'g', 14),
                    H(19, 'circle', 15),
                    _(20, 'g', 16),
                    H(21, 'path', 17)(22, 'path', 18),
                    E()()(),
                    oe(),
                    _(23, 'span'),
                    G(24),
                    E(),
                    ie(),
                    _(25, 'svg', 19)(26, 'title'),
                    G(27, 'Rocket Ship Smoke'),
                    E(),
                    H(28, 'path', 20),
                    E()(),
                    oe(),
                    _(29, 'h2'),
                    G(30, 'Resources'),
                    E(),
                    _(31, 'p'),
                    G(32, 'Here are some links to help you get started:'),
                    E(),
                    _(33, 'div', 21)(34, 'a', 22),
                    ie(),
                    _(35, 'svg', 23),
                    H(36, 'path', 24),
                    E(),
                    oe(),
                    _(37, 'span'),
                    G(38, 'Learn Angular'),
                    E(),
                    ie(),
                    _(39, 'svg', 23),
                    H(40, 'path', 25),
                    E()(),
                    oe(),
                    _(41, 'a', 26),
                    ie(),
                    _(42, 'svg', 23),
                    H(43, 'path', 27),
                    E(),
                    oe(),
                    _(44, 'span'),
                    G(45, 'CLI Documentation'),
                    E(),
                    ie(),
                    _(46, 'svg', 23),
                    H(47, 'path', 25),
                    E()(),
                    oe(),
                    _(48, 'a', 28),
                    ie(),
                    _(49, 'svg', 29),
                    H(50, 'path', 30)(51, 'path', 31)(52, 'path', 32)(
                      53,
                      'path',
                      33
                    )(54, 'path', 34),
                    E(),
                    oe(),
                    _(55, 'span'),
                    G(56, 'Angular Material'),
                    E(),
                    ie(),
                    _(57, 'svg', 23),
                    H(58, 'path', 25),
                    E()(),
                    oe(),
                    _(59, 'a', 35),
                    ie(),
                    _(60, 'svg', 23),
                    H(61, 'path', 36),
                    E(),
                    oe(),
                    _(62, 'span'),
                    G(63, 'Angular Blog'),
                    E(),
                    ie(),
                    _(64, 'svg', 23),
                    H(65, 'path', 25),
                    E()(),
                    oe(),
                    _(66, 'a', 37),
                    ie(),
                    _(67, 'svg', 38)(68, 'g'),
                    H(69, 'rect', 39),
                    E(),
                    _(70, 'g')(71, 'g'),
                    H(72, 'path', 40)(73, 'polygon', 41),
                    E()()(),
                    oe(),
                    _(74, 'span'),
                    G(75, 'Angular DevTools'),
                    E(),
                    ie(),
                    _(76, 'svg', 23),
                    H(77, 'path', 25),
                    E()()(),
                    oe(),
                    _(78, 'h2'),
                    G(79, 'Next Steps'),
                    E(),
                    _(80, 'p'),
                    G(81, 'What do you want to do next with your app?'),
                    E(),
                    H(82, 'input', 42, 43),
                    _(84, 'div', 21)(85, 'button', 44),
                    kt('click', function () {
                      return On(i), (gn(83).value = 'component')
                    }),
                    ie(),
                    _(86, 'svg', 23),
                    H(87, 'path', 45),
                    E(),
                    oe(),
                    _(88, 'span'),
                    G(89, 'New Component'),
                    E()(),
                    _(90, 'button', 44),
                    kt('click', function () {
                      return On(i), (gn(83).value = 'material')
                    }),
                    ie(),
                    _(91, 'svg', 23),
                    H(92, 'path', 45),
                    E(),
                    oe(),
                    _(93, 'span'),
                    G(94, 'Angular Material'),
                    E()(),
                    _(95, 'button', 44),
                    kt('click', function () {
                      return On(i), (gn(83).value = 'pwa')
                    }),
                    ie(),
                    _(96, 'svg', 23),
                    H(97, 'path', 45),
                    E(),
                    oe(),
                    _(98, 'span'),
                    G(99, 'Add PWA Support'),
                    E()(),
                    _(100, 'button', 44),
                    kt('click', function () {
                      return On(i), (gn(83).value = 'dependency')
                    }),
                    ie(),
                    _(101, 'svg', 23),
                    H(102, 'path', 45),
                    E(),
                    oe(),
                    _(103, 'span'),
                    G(104, 'Add Dependency'),
                    E()(),
                    _(105, 'button', 44),
                    kt('click', function () {
                      return On(i), (gn(83).value = 'test')
                    }),
                    ie(),
                    _(106, 'svg', 23),
                    H(107, 'path', 45),
                    E(),
                    oe(),
                    _(108, 'span'),
                    G(109, 'Run and Watch Tests'),
                    E()(),
                    _(110, 'button', 44),
                    kt('click', function () {
                      return On(i), (gn(83).value = 'build')
                    }),
                    ie(),
                    _(111, 'svg', 23),
                    H(112, 'path', 45),
                    E(),
                    oe(),
                    _(113, 'span'),
                    G(114, 'Build for Production'),
                    E()()(),
                    _(115, 'div', 46),
                    kn(116, yx, 2, 0, 'pre', 47),
                    kn(117, vx, 2, 0, 'pre', 48),
                    kn(118, Dx, 2, 0, 'pre', 48),
                    kn(119, _x, 2, 0, 'pre', 48),
                    kn(120, Cx, 2, 0, 'pre', 48),
                    kn(121, wx, 2, 0, 'pre', 48),
                    E(),
                    _(122, 'div', 21)(123, 'a', 49),
                    ie(),
                    _(124, 'svg', 50)(125, 'title'),
                    G(126, 'Meetup Logo'),
                    E(),
                    H(127, 'path', 51),
                    E()(),
                    oe(),
                    _(128, 'a', 52),
                    ie(),
                    _(129, 'svg', 53)(130, 'title'),
                    G(131, 'Discord Logo'),
                    E(),
                    H(132, 'path', 54)(133, 'path', 55),
                    E()()(),
                    oe(),
                    _(134, 'footer'),
                    G(135, ' Love Angular?\xa0 '),
                    _(136, 'a', 56),
                    G(137, ' Give our repo a star. '),
                    _(138, 'div', 57),
                    ie(),
                    _(139, 'svg', 23),
                    H(140, 'path', 58)(141, 'path', 59),
                    E(),
                    G(142, ' Star '),
                    E()(),
                    oe(),
                    _(143, 'a', 56),
                    ie(),
                    _(144, 'svg', 23),
                    H(145, 'path', 60)(146, 'path', 58),
                    E()()(),
                    _(147, 'svg', 61)(148, 'title'),
                    G(149, 'Gray Clouds Background'),
                    E(),
                    H(150, 'path', 62),
                    E()(),
                    oe(),
                    H(151, 'router-outlet')
                }
                if (2 & n) {
                  const i = gn(83)
                  fn(24),
                    qo('', r.title, ' app is running!'),
                    fn(91),
                    mn('ngSwitch', i.value),
                    fn(2),
                    mn('ngSwitchCase', 'material'),
                    fn(1),
                    mn('ngSwitchCase', 'pwa'),
                    fn(1),
                    mn('ngSwitchCase', 'dependency'),
                    fn(1),
                    mn('ngSwitchCase', 'test'),
                    fn(1),
                    mn('ngSwitchCase', 'build')
                }
              },
              directives: [vs, ry, ny, pc],
              styles: [
                '',
                '[_nghost-%COMP%] {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n\n  p[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 8px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover, .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%]:hover {\n    opacity: 0.8;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%] {\n    height: 24px;\n    width: auto;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  .card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: #888;\n  }\n\n  .card-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    all: unset;\n    border-radius: 4px;\n    border: 1px solid #eee;\n    background-color: #fafafa;\n    height: 40px;\n    width: 200px;\n    margin: 0 8px 16px;\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.2s ease-in-out;\n    line-height: 24px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card.card-small[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 168px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%] {\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n    position: relative;\n  }\n\n  .card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 60px;\n  }\n\n  svg#rocket[_ngcontent-%COMP%] {\n    width: 80px;\n    position: absolute;\n    left: -10px;\n    top: -24px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    height: calc(100vh - 95px);\n    position: absolute;\n    top: 10px;\n    right: 180px;\n    z-index: -10;\n  }\n\n  a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    color: #125699;\n  }\n\n  .terminal[_ngcontent-%COMP%] {\n    position: relative;\n    width: 80%;\n    max-width: 600px;\n    border-radius: 6px;\n    padding-top: 45px;\n    margin-top: 8px;\n    overflow: hidden;\n    background-color: rgb(15, 15, 16);\n  }\n\n  .terminal[_ngcontent-%COMP%]::before {\n    content: "\\2022 \\2022 \\2022";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 4px;\n    background: rgb(58, 58, 58);\n    color: #c2c3c4;\n    width: 100%;\n    font-size: 2rem;\n    line-height: 0;\n    padding: 14px 0;\n    text-indent: 4px;\n  }\n\n  .terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;\n    color: white;\n    padding: 0 1rem 1rem;\n    margin: 0;\n  }\n\n  .circle-link[_ngcontent-%COMP%] {\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    margin: 8px;\n    background-color: white;\n    border: 1px solid #eeeeee;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: 1s ease-out;\n  }\n\n  .circle-link[_ngcontent-%COMP%]:hover {\n    transform: translateY(-0.25rem);\n    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n  }\n\n  footer[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%] {\n    color: #24292e;\n    display: flex;\n    align-items: center;\n    font-size: 12px;\n    padding: 3px 10px;\n    border: 1px solid rgba(27,31,35,.2);\n    border-radius: 3px;\n    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);\n    margin-left: 4px;\n    font-weight: 600;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]:hover {\n    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);\n    border-color: rgba(27,31,35,.35);\n    background-position: -.5em;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 16px;\n    margin-right: 4px;\n  }\n\n  svg#clouds[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n  \n  @media screen and (max-width: 767px) {\n    .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    .card[_ngcontent-%COMP%]:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      display: none;\n      visibility: hidden;\n    }\n  }',
              ],
            })),
            e
          )
        })(),
        bx = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵmod = qt({ type: e })),
            (e.ɵinj = St({ imports: [[Gl]] })),
            e
          )
        })(),
        Mx = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵmod = qt({ type: e })),
            (e.ɵinj = St({ imports: [[Gl]] })),
            e
          )
        })(),
        Ix = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵmod = qt({ type: e, bootstrap: [Ex] })),
            (e.ɵinj = St({ providers: [], imports: [[FS, mx, bx, Mx]] })),
            e
          )
        })()
      ;(function vM() {
        xm = !1
      })(),
        OS()
          .bootstrapModule(Ix)
          .catch((e) => console.error(e))
    },
  },
  (X) => {
    X((X.s = 335))
  },
])
