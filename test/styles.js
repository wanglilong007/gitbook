var fs = require('fs');
var path = require('path');

describe.only('Styles', function () {
    describe('Multilanguages', function() {
        var book;

        before(function() {
            return books.generate("style-multilangs", "website")
                .then(function(_book) {
                    book = _book;
                });
        });

        it('should correctly copy styles', function() {
            console.log(fs.readdirSync(book.options.output))
            book.should.have.file("styles");
            book.should.have.file("styles/website.css");
        });

        it('should add it to sub-books', function() {
            var PAGE = fs.readFileSync(
                path.join(book.options.output, "en/index.html"),
                { encoding: "utf-8" }
            );
            PAGE.should.be.html({
                "link": {
                    count: 1,
                    attributes: {
                        href: "../styles/website.css"
                    }
                }
            });
        });
    });

    describe('eBooks', function() {
        var book;

        before(function() {
            return books.generate("style-print", "ebook")
                .then(function(_book) {
                    book = _book;
                });
        });

        it('should remove default print.css', function() {
            var PAGE = fs.readFileSync(
                path.join(book.options.output, "index.html"),
                { encoding: "utf-8" }
            );
            PAGE.should.be.html({
                "link": {
                    count: 1,
                    attributes: {
                        href: "./styles/print.css"
                    }
                }
            });
        });

        it('should correctly print.css', function() {
            book.should.have.file("styles");
            book.should.have.file("styles/print.css");
        });
    });
});
