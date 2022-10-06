import hideEmail from './email-masker';

describe('Test hideEmail()', (): void => {
    type EmailTestCase = {
        raw: string;
        userMasked: string;
        domainMasked: string;
    };
    const validEmails: EmailTestCase[] = [
        {
            raw: 'joe.bob+coding@gma.il.com',
            userMasked: 'j************g@gma.il.com',
            domainMasked: 'j************g@g**.il.com',
        },
        { raw: 'j@k.com', userMasked: 'j@k.com', domainMasked: 'j@k.com' },
        {
            raw: 'bo@go.co.uk',
            userMasked: 'bo@go.co.uk',
            domainMasked: 'bo@g*.co.uk',
        },
    ];

    const invalidEmails: string[] = ['what@is@this.even'];

    it('Works on a valid email address', (): void => {
        validEmails.forEach(
            ({ raw, userMasked, domainMasked }: EmailTestCase): void => {
                expect(hideEmail(raw)).toEqual(userMasked);
                expect(hideEmail(raw, true)).toEqual(domainMasked);
            }
        );
    });

    it('"Works" on an invalid email address', (): void => {
        invalidEmails.forEach((invalidEmail: string): void => {
            expect(hideEmail(invalidEmail)).toEqual('');
            expect(hideEmail(invalidEmail, true)).toEqual('');
        });
    });
});
