oe = (function () {
  var e = Object(Z.a)(
    $.a.mark(function e(t) {
      return $.a.wrap(function (e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              (t.target.disabled = !0),
                u.emit(
                  "setRoomId",
                  {
                    battleId: d,
                    roomId: y,
                  },
                  function (e) {
                    e &&
                      (200 === e.status
                        ? (S(!0),
                          n(ae("Room code set successfully.", "success")))
                        : ((t.target.disabled = !1), n(ae(e.msg, "danger"))));
                  }
                );
            case 2:
            case "end":
              return e.stop();
          }
      }, e);
    })
  );
  return function (t) {
    return e.apply(this, arguments);
  };
})();
