import {Server} from 'socket.io'

export function useSocket(io: Server) {
  // This event refers to the connections between hypnos and the two clients
  io.on('connection', (socket: any) => {
    console.log(`${socket.id} is connected.`)

    // This function is getting the images from the front end application and sending them to drowsy api
    socket.on('sendFrame', (data: any) => {
      console.log(`Imagens recebidas de ${socket.id}`)

      io.emit('server_to_drowsy', data)
    })

    // This function is used to get the status of the worker face from drowsy api
    socket.on('Status', (response: any) => {
      console.log(response)
    })
  })
}
