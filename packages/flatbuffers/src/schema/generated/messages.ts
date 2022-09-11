// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers'

import { MessageBuffer, MessageBufferT } from './message-buffer'

export class Messages {
  bb: flatbuffers.ByteBuffer | null = null
  bb_pos = 0
  __init(i: number, bb: flatbuffers.ByteBuffer): Messages {
    this.bb_pos = i
    this.bb = bb
    return this
  }

  static getRootAsMessages(
    bb: flatbuffers.ByteBuffer,
    obj?: Messages
  ): Messages {
    return (obj || new Messages()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    )
  }

  static getSizePrefixedRootAsMessages(
    bb: flatbuffers.ByteBuffer,
    obj?: Messages
  ): Messages {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH)
    return (obj || new Messages()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb
    )
  }

  messages(index: number, obj?: MessageBuffer): MessageBuffer | null {
    const offset = this.bb!.__offset(this.bb_pos, 4)
    return offset
      ? (obj || new MessageBuffer()).__init(
          this.bb!.__indirect(
            this.bb!.__vector(this.bb_pos + offset) + index * 4
          ),
          this.bb!
        )
      : null
  }

  messagesLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4)
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0
  }

  static startMessages(builder: flatbuffers.Builder) {
    builder.startObject(1)
  }

  static addMessages(
    builder: flatbuffers.Builder,
    messagesOffset: flatbuffers.Offset
  ) {
    builder.addFieldOffset(0, messagesOffset, 0)
  }

  static createMessagesVector(
    builder: flatbuffers.Builder,
    data: flatbuffers.Offset[]
  ): flatbuffers.Offset {
    builder.startVector(4, data.length, 4)
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]!)
    }
    return builder.endVector()
  }

  static startMessagesVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(4, numElems, 4)
  }

  static endMessages(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject()
    return offset
  }

  static finishMessagesBuffer(
    builder: flatbuffers.Builder,
    offset: flatbuffers.Offset
  ) {
    builder.finish(offset)
  }

  static finishSizePrefixedMessagesBuffer(
    builder: flatbuffers.Builder,
    offset: flatbuffers.Offset
  ) {
    builder.finish(offset, undefined, true)
  }

  static createMessages(
    builder: flatbuffers.Builder,
    messagesOffset: flatbuffers.Offset
  ): flatbuffers.Offset {
    Messages.startMessages(builder)
    Messages.addMessages(builder, messagesOffset)
    return Messages.endMessages(builder)
  }

  unpack(): MessagesT {
    return new MessagesT(
      this.bb!.createObjList(this.messages.bind(this), this.messagesLength())
    )
  }

  unpackTo(_o: MessagesT): void {
    _o.messages = this.bb!.createObjList(
      this.messages.bind(this),
      this.messagesLength()
    )
  }
}

export class MessagesT {
  constructor(public messages: MessageBufferT[] = []) {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    const messages = Messages.createMessagesVector(
      builder,
      builder.createObjectOffsetList(this.messages)
    )

    return Messages.createMessages(builder, messages)
  }
}