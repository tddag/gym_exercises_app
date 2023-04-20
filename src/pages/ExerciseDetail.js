import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material';

//import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'

import {EXERCISES_DATA} from '../data/exercisesData'


const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([])
  const [equipmentExercises, setEquipmentExercises] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async() => {
      // const exerciseUrl = "https://exercisedb.p.rapidapi.com";
      // const youtubeSearchUrl = "https://youtube-search-and-download.p.rapidapi.com"

      // const exerciseDetailData = await fetchData(`${exerciseUrl}/exercises/exercise/${id}`, exerciseOptions)
      const exerciseDetailData = EXERCISES_DATA.find((exercise) => exercise.id === id)
      setExerciseDetail(exerciseDetailData)

      // console.log("Exercise Details")
      // console.log(exerciseDetailData)      

      // const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions )


      var youtubeData = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${exerciseDetailData.name}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
      youtubeData = await youtubeData.json()

      const exerciseVideosData = youtubeData.items?.map((item) => ({
        video: {
          videoId: item.id.videoId,
          title: item.snippet.title,
          channelName: item.snippet.channelTitle,
          thumbnails: [
            {url: item.snippet.thumbnails?.default.url}
          ]
        }
      }))
      // console.log("Youtube Data: ")
      // console.log(exerciseVideosData)
      setExerciseVideos(exerciseVideosData)

      // [{
      //   video: {
      //     videoId: "id",
      //     thumbnails: [
      //       url: "url"
      //     ],
      //     title: "title",
      //     channelName: "channelName"
      //   }
      // }]
      // setExerciseVideos(exerciseVideosData.contents)


      // console.log("Exercise Videos Data: ")
      // console.log(exerciseVideosData)

      // const targetMuscleExercisesData = await fetchData(`${exerciseUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions)
      const targetMuscleExercisesData = EXERCISES_DATA.filter((exercise) => exercise.target === exerciseDetailData.target)
      setTargetMuscleExercises(targetMuscleExercisesData)


      // const equipmentExercisesData = await fetchData(`${exerciseUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions)
      const equipmentExercisesData = EXERCISES_DATA.filter((exercise) => exercise.equipment === exerciseDetailData.equipment)
      setEquipmentExercises(equipmentExercisesData)


    }

    fetchExerciseData()
  }, [id])

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
    </Box>
  )
}

export default ExerciseDetail