import { Controller } from 'egg';
import { launch, Browser, Page } from 'puppeteer';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const browser: Browser = await launch();
    const page: Page = await browser.newPage();
    await page.goto('http://127.0.0.1:7001/demo', { waitUntil: 'networkidle2' });
    await page.pdf({ path: './demo.pdf', printBackground: true });
    await browser.close();
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async demo() {
    const { ctx } = this;
    await ctx.render('demo.ejs', {
      data: 'world',
    });
  }
}
