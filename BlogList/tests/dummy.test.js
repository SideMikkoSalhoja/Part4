const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favoriteBlog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ];
  
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Another Blog',
        author: 'Author 2',
        url: 'https://example.com/another',
        likes: 10,
        __v: 0
      }
    ];
  
    test('when list has only one blog, returns that blog as favorite', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog);
      assert.deepStrictEqual(result, {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      });
    });
  
    test('when list has multiple blogs, returns the one with the most likes', () => {
      const result = listHelper.favoriteBlog(listWithMultipleBlogs);
      assert.deepStrictEqual(result, {
        title: 'Another Blog',
        author: 'Author 2',
        likes: 10
      });
    });
  
    test('if multiple blogs have the same number of likes, returns one of them', () => {
      const result = listHelper.favoriteBlog([
        { title: 'Blog 1', author: 'Author 1', likes: 10 },
        { title: 'Blog 2', author: 'Author 2', likes: 10 }
      ]);
      assert.ok(result.title === 'Blog 1' || result.title === 'Blog 2');
    });
  });

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
  })

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

test('return mostblogs', () => {
    const blogs = [
        { title: "Blog 1", author: "Robert C. Martin", likes: 5 },
        { title: "Blog 2", author: "Edsger W. Dijkstra", likes: 10 },
        { title: "Blog 3", author: "Robert C. Martin", likes: 2 },
        { title: "Blog 4", author: "Edsger W. Dijkstra", likes: 3 },
        { title: "Blog 5", author: "Robert C. Martin", likes: 8 }
      ];
  
    const result = listHelper.mostBlogs(blogs)
    assert.ok(result.author === 'Robert C. Martin');
  })

  test('return mostlikes', () => {
    const blogs = [
        { title: "Blog 1", author: "Robert C. Martin", likes: 5 },
        { title: "Blog 2", author: "Edsger W. Dijkstra", likes: 10 },
        { title: "Blog 3", author: "Robert C. Martin", likes: 2 },
        { title: "Blog 4", author: "Edsger W. Dijkstra", likes: 3 },
        { title: "Blog 5", author: "Robert C. Martin", likes: 8 }
      ];
  
    const result = listHelper.mostLikes(blogs)
    assert.ok(result.author === 'Robert C. Martin');
  })