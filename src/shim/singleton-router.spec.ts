import {SingletonRouter} from "./singleton-router";
import {Router} from "../router";

describe(SingletonRouter.name, ()=> {
    it("can get instance", ()=> {
        expect(SingletonRouter.getInstance() instanceof Router).toBeTruthy();
    });

    it("returns same isntance every time", ()=> {
        const instance = SingletonRouter.getInstance();

        expect(SingletonRouter.getInstance()).toBe(instance);
    });

    it("can set data", ()=> {
        SingletonRouter.setData({
            base_url: '',
            routes: {
                homepage: {
                    tokens: [['text', 'homepage']]
                }
            }
        })
    });

    it("generates urls", ()=> {
        SingletonRouter.setData({
            base_url: '',
            routes: {
                homepage: {
                    tokens: [['text', '/homepage']]
                }
            }
        });

        expect(SingletonRouter.getInstance().generate('homepage')).toBe('/homepage')
    });
});
