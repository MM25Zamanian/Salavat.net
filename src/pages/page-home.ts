/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import config from '../config.js';
import { PageElement } from '../helpers/page-element.js';
import rebootCSS from '../reboot.js';

@customElement('page-home')
export class PageHome extends PageElement {
  static styles = [
    unsafeCSS(rebootCSS),
    css`
      section {
        padding: 1rem;
      }
      .text-jus {
        text-align: justify;
      }
    `,
  ];

  render() {
    return html`
      <section>
        <h1>کمپین نظر فرج</h1>

        <div class="text-jus">
          گاهی آنقدر تلخی زندگی‌مان زیاد می شود،که رنگِ خوشِ شادی روزهایمان، در
          قرنطینه تلخِ روزگار به خاکستری می زند. اما ما یاد گرفته ایم تا دهانمان
          را با سلام و صلوات بر محمد و آل او و درخواست فرج فرزندشان شیرین کنیم
          تا همه چیز با نشاط شود و غم، از زندگی‌مان رخت ببندد. سلامی به شیرینی
          با تو بودن... به مناسبت ایام پر برکت شعبان و رمضان، تصمیم گرفتیم کمپین
          نذر "یک میلیون" صلوات به نیت دعا برای سلامتی و ظهور امام زمان (عجل
          الله تعالی فرجه الشریف) را از میلاد حضرتش تا میلاد کریم اهل‌بیت، حضرت
          امام حسن مجتبی (علیه السلام) در نیمه رمضان آغاز کنیم. برای هماهنگی و
          رسیدن به عدد یک میلیون صلوات، خواهشمندیم تعداد صلوات‌های فرستاده شده
          را در شمارنده وارد کنید.
        </div>
      </section>
    `;
  }

  meta() {
    return {
      title: `اپلیکیشن ${config.appName}`,
      titleTemplate: null,
      description: config.appDescription,
    };
  }
}
