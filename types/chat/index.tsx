export interface UserOnlineResponse {
  id: string
  name: string
}

export interface MessageRequest {
  message: string
}

export interface ChatRoom {
  receiveId: string
  receiverName: string
}

export interface MessageResponse {
  id: string
  receiveId: string
  sendId: string
  context: string
  created: Date
}
