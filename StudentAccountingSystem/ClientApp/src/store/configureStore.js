import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';

//reducers
import { loginAndRegisterReducer } from "../components/LoginAndRegister/reducer";
import { profileReducer } from "../components/Student/Profile/reducer";
import { addCourseReducer } from "../components/Admin/AddCourse/reducer";
import { coursesReducer } from "../components/Student/Courses/reducer";
import { listStudentsReducer } from "../components/Admin/ListStudents/reducer";
import { courseInfoReducer } from "../components/Student/CourseInfo/reducer";
import { studentProfileReducer } from "../components/Admin/Student/reducer";
import { myCoursesReducer } from "../components/Student/MyCourses/reducer";
import { listCoursesReducer } from "../components/Admin/ListCourses/reducer";

export default function configureStore(history, initialState) {
  const reducers = {
    loginAndRegister: loginAndRegisterReducer,
    profile: profileReducer,
    addCourse: addCourseReducer,
    courses: coursesReducer,
    listStudents: listStudentsReducer,
    courseInfo: courseInfoReducer,
    studentProfile: studentProfileReducer,
    myCourses: myCoursesReducer,
    listCourses: listCoursesReducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
