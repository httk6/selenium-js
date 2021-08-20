const fs = require('fs');

const { sleep }= require('@theintern/leadfoot/lib/util');

const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('app', () => {
    it('ヤフーにアクセスして「test」で検索', async test => {
        const { remote } = test;
        await remote
            .get('http://www.yahoo.co.jp/')

        await remote.setFindTimeout(5 * 1000);
        await remote.findById('srchtxt').type('test');
        await remote.findById('srchbtn').click();
        await sleep(1000);
        
        expect(await remote.findDisplayedById('yschsp').getAttribute('value')).to.equal('うおぽぉ')
        const data = await remote.takeScreenshot()
        fs.writeFileSync('./uopolo.png', data, 'base64');
    });
});