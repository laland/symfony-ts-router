import {fos, Routing} from "./index";

describe("index", ()=> {
    it("fos.Router.setData sets data, that Routing uses to generate urls", ()=> {
        fos.Router.setData({
            base_url: '',
            routes: {
                foo: {
                    tokens: [['text', '/bar']]
                }
            }
        });

        expect(Routing.generate('foo')).toEqual('/bar')
    });
});