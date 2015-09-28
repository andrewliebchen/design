/*
Projects = {
  name: string,
  description: string,
  created_at: number,
  images: array,
  team: array,
  cover_image: string
}

Images = {
  url: string,
  name: string,
  description: string,
  created_at: number,
  comments: array,
  parent: string
}

Comments = {
  user: string,
  comment: string,
  created_at: string,
  location: {
    x: number,
    y: number
  }
}
*/

const _ = lodash;

function createProject() {
  return Projects.insert({
    name: `Project Name ${_.random(100, 999)}`,
    description: 'Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum.',
    created_at: Date.now()
  });
};

function createImage(projectId) {
  return Images.insert({
    url: 'http://thecatapi.com/api/images/get?format=src',
    name: `Image ${_.random(100, 999)}`,
    description: 'Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare.',
    created_at: Date.now(),
    parent: projectId
  });
};

function createComment(projectId) {
  return Comments.insert({
    comment: 'Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue.',
    created_at: Date.now(),
    parent: projectId
  });
};

Meteor.startup(function() {
  if(Projects.find().count() === 0) {
    const seedProject = createProject();

    _.times(3, () => {
      createImage(seedProject)
    });

    createComment(seedProject);
  }
});
