import { getModelPropDefaultValue as getDefault } from '../utils/common'
import Participant from "./Participant";

export default class EventParticipant {
  constructor(data, initModel = true) {
    if (initModel) {
      this.init(data)
    }
  }

  init(data) {
    if (!data) return;
    this.id = getDefault(data.id, 'string', null)
    this.created = getDefault(data.created, 'date')
    this.modified = getDefault(data.modified, 'date')
    this.isOptional = getDefault(data.isOptional, 'boolean')
    this.isOrganizer = getDefault(data.isOrganizer, 'boolean')
    this.eventId = getDefault(data.eventId, 'string', null)    
    this.participantId = getDefault(data.participantId, 'string', null) 
    this.participant = new Participant(getDefault(data.participant, 'object'))
  }
}
