import React, {useState, useEffect} from 'react'
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

// import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

import {EXERCISES_DATA} from '../data/exercisesData'

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const exercisesPerPage = 50

  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage

  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

  const paginate = (e, value) => {
    setCurrentPage(value)

    window.scrollTo({top: 1800, behavior: 'smooth'})
  }

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      // if (bodyPart === 'all') {
      //   exercisesData = await fetchData(
      //     'https://exercisedb.p.rapidapi.com/exercises/', exerciseOptions
      //   )
      //   console.log("ExercisesData")
      //   console.log(exercisesData)
      // } else {
      //   exercisesData = await fetchData(
      //     `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions
      //   )
      // }

      exercisesData = EXERCISES_DATA
      console.log("Exercise DAta length: ", exercisesData.length);
      if (bodyPart !== 'all') {
        exercisesData = exercisesData.filter((exercise) => exercise.bodyPart === bodyPart)
      }

      //console.log(exercisesData)
      setExercises(exercisesData)
    }

    fetchExercisesData()
  }, [bodyPart]) 

  return (
    <Box id="exercises" sx={{ mt: { lg: '110px'}}} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      <Stack direction="row" sx={{ gap: { lg: '110px', xs: '50px'}}} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise}/>
        ))}
      </Stack> 
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination 
            color="standard" 
            shape="rounded" 
            defaultPage={1} 
            count={Math.ceil(exercises.length / exercisesPerPage)} 
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
        
      </Stack>
    </Box>
  )
}

export default Exercises