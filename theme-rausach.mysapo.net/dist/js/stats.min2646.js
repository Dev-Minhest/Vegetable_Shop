(function() {
    function ft() {
        var y = { session_type: t, active_session: rt, store_id: o, session_id: c, visitor_id: l, reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, visit_returning: i, article_id: BizwebAnalytics.meta.article ? BizwebAnalytics.meta.article.id : undefined },
            p;
        (t === "checkout_contact_view" || t === "checkout_all_view") && (y.value = Bizweb.Checkout.fbEvent ? Bizweb.Checkout.fbEvent.value : "", y.currency = BizwebAnalytics.meta.currency, y.content_ids = Bizweb.Checkout.fbEvent ? Bizweb.Checkout.fbEvent.content_ids : []);
        (t === "product_view" || t === "product_view_from_search") && (p = [], p.push(BizwebAnalytics.meta.product.id), y.currency = BizwebAnalytics.meta.currency, y.value = BizwebAnalytics.meta.product.price, y.content_ids = p);
        n.postData(k, y, v, e)
    }

    function et() {
        ft();
        n.postData(y, { store_id: o, session_id: c, visitor_id: l, product_alias: g, action: "view", reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, visit_returning: i }, null, e)
    }

    function ht() {
        et();
        n.postData(y, { store_id: o, session_id: c, visitor_id: l, product_alias: g, action: "search", reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, visit_returning: i }, null, e)
    }

    function ct() {
        var t = Bizweb.checkout.line_items;
        n.postData(k, { session_type: "thank_you_view", active_session: rt, store_id: o, session_id: c, visitor_id: l, reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, from_product_view: d, visit_returning: i, first_time_access: Bizweb.first_time_accessed, currency: BizwebAnalytics.meta.currency, value: Bizweb.checkout.total_price, content_ids: Bizweb.checkout.line_items.map(function(n) { return n.id }), phone: Bizweb.checkout.billing_address.phone, city: Bizweb.checkout.billing_address.city, country: Bizweb.checkout.billing_address.country_code }, v, e);
        t.forEach(function(t) { n.postData(y, { store_id: o, session_id: c, visitor_id: l, product_id: t.product_id, variant_id: t.variant_id, action: "purchase", reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, visit_returning: i }, null, e) })
    }

    function nt(n, t, i, r) {
        this.xhr = n;
        this.url = t;
        this.method = i;
        this.body = r
    }
    var n = function() {
            function n(n) { for (var t, r = n + "=", u = document.cookie.split(";"), i = 0; i < u.length; i++) { for (t = u[i]; t.charAt(0) == " ";) t = t.substring(1); if (t.indexOf(r) == 0) return t.substring(r.length, t.length) } }

            function t(n, t) { var i = new URLSearchParams(t.toLowerCase()); return i.get(n.toLowerCase()) }

            function i(n, t, i) {
                var r = new Date,
                    u;
                r.setTime(r.getTime() + i * 6e4);
                u = "expires=" + r.toUTCString();
                document.cookie = n + "=" + t + ";" + u + ";path=/"
            }

            function r() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(n) {
                    var t = Math.random() * 16 | 0,
                        i = n == "x" ? t : t & 3 | 8;
                    return i.toString(16)
                })
            }

            function u(n, t, i, r) { fetch(n, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(t) }).then(function(n) { return n.json() }).then(function(n) { i(n) }).catch(function(n) { r(n) }) }
            return { getCookie: n, setCookie: i, getUUID: r, postData: u, getParamValue: t }
        }(),
        ut, ot, st, tt;
    n.getCookie("_landing_full_page") || n.getCookie("_landing_type") || !Bizweb.template || (n.setCookie("_landing_full_page", location.href, 21600), n.setCookie("_landing_type", Bizweb.template, 21600));
    var it = window.BizwebAnalytics.tracking_url,
        w = n.getCookie("_s"),
        p = n.getCookie("_v"),
        rt = !!sessionStorage.getItem("active"),
        r = n.getCookie("_landing_full_page"),
        u = n.getCookie("_landing_type"),
        f = unescape(n.getCookie("_landing_page")),
        i = !1;
    p && (ut = n.getCookie("_v_new"), ut || (i = !0));
    var b = n.getCookie("_origin_reference_site"),
        k = it + "/api/v1/page-views",
        y = it + "/api/v1/product-actions",
        v = function() {
            n.setCookie("_s", w, 30);
            n.setCookie("_v", p, 1576800);
            n.setCookie("_origin_reference_site", b, 43200);
            i || n.setCookie("_v_new", !0, 30)
        },
        e = function(n) { console.log(n) };
    w || (w = n.getUUID());
    p || (p = n.getUUID());
    b === undefined && (b = document.referrer);
    var o = Bizweb ? Bizweb.id : 0,
        s = document.referrer,
        h = b,
        c = w,
        l = p,
        a = location.href,
        d = !1,
        t, g;
    switch (Bizweb.template) {
        case "collection":
            t = location.pathname !== "/collections/all" ? "collection_view" : "page_view";
            break;
        case "product":
            d = !0;
            g = location.pathname;
            t = "product_view";
            document.referrer !== "" && new URL(document.referrer).pathname === "/search" && (t = "product_view_from_search");
            break;
        case "cart":
            t = "cart_view";
            break;
        case "checkout":
            if (Bizweb.Checkout) switch (n.getParamValue("step", location.search)) {
                case "contact_information":
                    t = "checkout_contact_view";
                    break;
                case "shipping_method":
                    t = "checkout_shipping_view";
                    break;
                case "payment_method":
                    t = "checkout_payment_view";
                    break;
                default:
                    t = "checkout_all_view"
            }
            break;
        case "thankyou":
            Bizweb.checkout && (t = "thank_you_view");
            break;
        default:
            t = "page_view"
    }
    sessionStorage.setItem("active", "active");
    switch (t) {
        case "page_view":
        case "cart_view":
        case "checkout_contact_view":
        case "checkout_shipping_view":
        case "checkout_payment_view":
        case "checkout_all_view":
        case "collection_view":
            ft();
            break;
        case "product_view":
            et();
            break;
        case "product_view_from_search":
            ht();
            break;
        case "thank_you_view":
            ct()
    }
    nt.prototype.onReadyStateChange = function() {
        this.xhr.readyState === XMLHttpRequest.DONE && this.handleXhrDone({ method: this.method, url: this.url, body: this.body, xhr: this.xhr });
        this.oldOnReadyStateChange && this.oldOnReadyStateChange(this.xhr)
    };
    nt.prototype.handleXhrDone = function(t) {
        try {
            switch (t.url) {
                case "/cart/add.js":
                    if (t.xhr.responseText) {
                        var p = JSON.parse(t.xhr.responseText),
                            w = [];
                        w.push(p.product_id);
                        n.postData(k, { session_type: "add_to_cart", active_session: !0, store_id: o, session_id: c, visitor_id: l, reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, from_product_view: d, visit_returning: i, currency: BizwebAnalytics.meta.currency, value: p.price, content_ids: w }, v, e);
                        n.postData(y, { store_id: o, session_id: c, visitor_id: l, variant_id: n.getParamValue("variantId", t.body), action: "add_to_cart", reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, visit_returning: i }, v, e);
                        new URL(location.href).pathname === "/search" && n.postData(y, { store_id: o, session_id: c, visitor_id: l, variant_id: n.getParamValue("variantId", t.body), action: "search", reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, visit_returning: i }, v, e)
                    }
                    break;
                case "/cart/change.js":
                    n.getParamValue("quantity", t.body) === "0" && n.postData(y, { store_id: o, session_id: c, visitor_id: l, variant_id: n.getParamValue("variantId", t.body), action: "remove_from_cart", reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, visit_returning: i }, v, e)
            }
        } catch (b) { console.log(b.message) }
        return t
    };
    ot = XMLHttpRequest.prototype.open;
    st = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(n, t) { return this._url = t, this._method = n, ot.apply(this, arguments) };
    XMLHttpRequest.prototype.send = function(n) { var t = new nt(this, this._url, this._method, n); return this.addEventListener ? this.addEventListener("readystatechange", t.onReadyStateChange.bind(t), !1) : (t.oldOnReadyStateChange = this.onreadystatechange, this.onreadystatechange = t.onReadyStateChange), st.call(this, n) };
    tt = window.fetch;
    "function" == typeof tt && (window.fetch = function() {
        return tt.apply(window, Array.prototype.slice.call(arguments)).then(function(t) {
            if (!t.ok) return t;
            try {
                switch (data.url) {
                    case "/cart/add.js":
                        n.postData(k, { session_type: "add_to_cart", active_session: !0, store_id: o, session_id: c, visitor_id: l, reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, from_product_view: d, visit_returning: i }, v, e);
                        n.postData(y, { store_id: o, session_id: c, visitor_id: l, variant_id: n.getParamValue("variantId", data.body), action: "add_to_cart", reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, visit_returning: i }, v, e);
                        new URL(location.href).pathname === "/search" && n.postData(y, { store_id: o, session_id: c, visitor_id: l, variant_id: n.getParamValue("variantId", data.body), action: "search", reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, visit_returning: i }, v, e);
                        break;
                    case "/cart/change.js":
                        n.getParamValue("quantity", query) === "0" && n.postData(y, { store_id: o, session_id: c, visitor_id: l, variant_id: n.getParamValue("variantId", data.body), action: "remove_from_cart", reference_site: s, origin_reference_site: h, current_site: a, landing_type: u, landing_page: f, landing_full_page: r, visit_returning: i }, v, e)
                }
            } catch (p) { console.log(p.message) }
            return t
        })
    })
})();