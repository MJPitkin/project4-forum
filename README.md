# project4-forum

# Description

 For this project, I made a bulletin board/web forum app, using a Django database to handle the backend and React.js to create the frontend.
 
# Timeframe/Working Team

The timeframe for this project was 3 weeks, and I chose to make it a solo project (as I wanted to get a firmer grasp on aspects of full stack development I’d not explored during project 3).


# Technologies used

- JavaScript
- React.js
- Python
- Django
- HTML/CSS

# Brief

- Build a full-stack application by making your own backend and your own front-end
- Use a Python Django API using Django REST Framework to serve your data from a Postgres database
- Consume your API with a separate front-end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
- (Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut)
- Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
- Be deployed online so it's publicly accessible.

# Planning

The initial plan I had was done in two broad strokes; first a wireframe of the frontend of the website, so I could determine what elements the final product would need to be functional to a user, which was then used to inform some short notes on what properties and models I would need on the backend database to support it. As I had some uncertainties with the technologies being used at this time, I kept my planning lightweight; I anticipated that changes would need to be made during the build process as I got a stronger grasp on Django, thus with my then level of experience it made sense to remain flexible.




















Frontend wireframe:


The frontend was to display the boards/topics, threads and posts pulled from the database, giving users UX elements to make new threads/posts and edit previous ones, as well as providing user info/login management. 


Backend notes:

```CORE FUNCTIONALITY:

Forum:
	-sign up to create user
	-logged in users can make threads on boards and write posts
		-should have at least two separate boards (maybe on topic and off topic?)
		-create threads
			thread has a title, original post by the author
			the thread OP can be deleted/edited
		-create posts
			posts can be deleted/edited by their authors
	regular users can delete and update their threads/posts
	admin users can delete and update any thread/any post


models:

	post:
		author: foreign key, username populated from ID
		thread: thread posted in
		content: textfield
		created_at
		edited_at
	thread:
		author: foreign key username
		posts: all posts 
		created_at
		title
		board: which board it was created on
		
	Board:
		threads: all threads associated with that board
		topic: name of board/topic of discussion
	user:
		username
		email
		password
		is_admin: bool
	


EXTENDED FUNCTIONALITY:

add tags to threads
add ratings to posts
make threads lockable by admin users
parse hyperlinks and images in posts
search for posts by author/content
```
The backend was in turn designed to support the needs of the frontend wireframe, with frameworks for the anticipated model properties and functions that would be needed, along with ideas for extended functionality. As the project progressed, some core functionality was relegated to later extension, and the means by which some models would interact with one another was changed significantly.

# Build process

I began the build by developing the backend, on the basis that this was the aspect I felt would take me the most time and was the part I most needed experience with (compared to the React.js frontend, which by this point I’d had significant exposure to). A major early change that occurred when going from the initial plan of the backend to functioning code was retooling how the models would relate to one another. I’d initially worked on the idea that each parent model would have an foreign key array of its children (e.g. a thread would contain an array of its posts), but I realised that would result in a large property that would be inelegant to address in queries. Instead, I flipped this around and gave each child a foreign key indicating which parent it belonged to, avoiding bloat and making query writing more concise.

Post model:
```
class Post(models.Model):
       author = models.ForeignKey(User,null=True, on_delete=models.SET_NULL)
       @property
       def authorname(self):
               return self.author.username
       content = models.TextField()
       thread = models.ForeignKey(Thread,null=True, on_delete=models.CASCADE)
       created_at = models.DateTimeField(auto_now_add=True)
       edited_at = models.DateTimeField(auto_now=True)
```
Thread model:
```
class Thread(models.Model):
   author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
   @property
   def authorname(self):
       return self.author.username
   # posts = models.ForeignKey(Post,null=True, on_delete=models.SET_NULL)
   board = models.ForeignKey(Board, null=True, on_delete=models.CASCADE)
   created_at = models.DateTimeField(auto_now_add=True)
   title = models.CharField(max_length=50)
   # board = models.ForeignKey(Board)
```

In order to securely handle logging in and signing up, along with permitting users to remain logged in, I implemented a JSON web token system using PyJWT. For the token itself, I used the built-in user model for Django as while I’d tried making my own custom one initially, I soon realised that wasn’t needed: for something with as straightforward/unintrusive a signup as a forum (i.e. no real name, address, etc) all that was needed was already in the generic model (username, email, password + confirmation, and finally a flag to determine if a user account had staff privileges).

In order to implement CRUD functionality for creating threads and posts, I installed the Django REST framework. Once again I found that for the relatively common scenario I had in mind, the framework already had a number of pre-made generic views for handling CRUD requests, which I implemented. 




Views for creating and retrieving posts:
```
class PostListCreate(generics.ListCreateAPIView):
   queryset = Post.objects.all()
   serializer_class = PostSerializer
   permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
   # def get(self, request, *args, **kwargs):
   #     return self.list(request, *args, **kwargs)
 
   def get_queryset(self):
       self.thread_id = get_object_or_404(Thread, id=self.kwargs['thread_id'])
       return Post.objects.filter(thread=self.thread_id)
 
   def post(self, request, *args, **kwargs):
       # self.thread_id = get_object_or_404(Thread, id=self.kwargs['thread_id'])
       return self.create(request, *args, **kwargs)
```

However, I wanted to ensure that creating, editing and deleting threads and posts would be limited to only logged in, authenticated users. This was achieved by implementing Django’s built in permissions system to the route, limiting “unsafe” routes to only be available to such users.
```
class PostListCreate(generics.ListCreateAPIView):
   queryset = Post.objects.all()
   serializer_class = PostSerializer
   permission_classes = (permissions.IsAuthenticatedOrReadOnly,)



class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
   queryset = Post.objects.all()
   serializer_class = PostSerializer
   permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
```

With the backbone of the database created, I then moved onto the frontend. This was done as a single page application in React.js, with the relevant visible parts of the forum (e.g. boards, threads, posts, etc) being fetched from the server as the user navigated through. In order to ensure the correct pages were being loaded, part of the payload sent by the server was the key for a given board or thread. This was then added to the route on the frontend and subsequently read in via React Router’s useparams() function, allowing for data to be fetched according to the ID of its parent model.

```
function ThreadPage(user) {
 console.log(user);
 const {boardId, threadId} = useParams();
 console.log(`${boardId}, ${threadId}`)
 
 const [posts, setPosts] = useState([])
 const [thread, setThread] = useState({})
 
 async function getPosts() {
   return fetch(`http://127.0.0.1:8000/boards/${boardId}/threads/${threadId}/posts/`, {
```
The authentication token stored on the user end was edited to also contain the username and user ID, allowing for an authenticated token to be read in by the SPA if present and automatically fill in the relevant user details without needing another fetch request to be performed.

With the forum now with functioning login, signup and posting capability, I then did a CSS pass on the frontend, going for a deliberately minimalist style in keeping with older styles of forum, as I’d often found these lighter less modern image board style designs to be much easier to read than more contemporary styles (such as Reddit).

# Challenges

The biggest initial challenge I had was in the initial stages, of actually conceptualising the database structure; while this wasn’t the first full stack app I’d worked on, my previous project had been in a group wherein much of the backend had been handled by another team member, thus there were concepts I had to get practical experience of before they truly clicked. 

An issue that cropped up at the last minute was a CORS preflight error that took quite some tracking down, which was naturally quite concerning when the app was to be presented during a Zoom call later that same day.

# Wins

I struggled quite a lot with this project, due to both getting to grips with the content and illness during the project window, so having overcome those issues to end up with a functioning forum by the end was something I was quite pleased by. I also was pleasantly surprised by how many times Django and its frameworks already had a built-in function for performing an essential but common task, which in turn made me much more comfortable with using it as the basis for a backend. Finally, having a CORS issue but being able to track down the necessary Django REST framework setting to fix it while things were down to the wire felt very satisfying.

# Key Learnings/Takeaways

- Generally more comfortable with the development of backend APIs, which was a goal I’d hoped for with this project.
- Many frameworks and APIs will have commonly used features already available in some form, reducing the need to reinvent the wheel each time.

# Bugs

No bugs per se, but there are several improvements to be made.

# Future Improvements

- While CRUD functionality is implemented on the backend, editing/deleting posts is not enabled via the frontend at this time; that needs adding.
- Implement ability to update a user password.
- Implement admin control panels on the front end for user and thread management.
- Add the ability for images and urls to be parsed and displayed when added to posts.

