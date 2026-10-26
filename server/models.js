import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const opts = { timestamps: true };

export const Project = model(
  'Project',
  new Schema(
    {
      title: { type: String, required: true, trim: true },
      description: { type: String, default: '' },
      details: { type: String, default: '' },
      image: { type: String, default: '' },
      tags: { type: [String], default: [] },
      liveUrl: { type: String, default: '' },
      githubUrl: { type: String, default: '' },
      featured: { type: Boolean, default: false },
      order: { type: Number, default: 0 },
    },
    opts
  )
);

export const Skill = model(
  'Skill',
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      category: { type: String, default: 'Frontend', trim: true },
      level: { type: Number, default: 80, min: 0, max: 100 },
      order: { type: Number, default: 0 },
    },
    opts
  )
);

export const Experience = model(
  'Experience',
  new Schema(
    {
      type: { type: String, enum: ['work', 'education'], default: 'work' },
      title: { type: String, required: true, trim: true },
      organization: { type: String, default: '' },
      period: { type: String, default: '' },
      description: { type: String, default: '' },
      bullets: { type: [String], default: [] },
      order: { type: Number, default: 0 },
    },
    opts
  )
);

export const Message = model(
  'Message',
  new Schema(
    {
      name: { type: String, required: true, trim: true, maxlength: 100 },
      email: { type: String, required: true, trim: true, maxlength: 200 },
      subject: { type: String, default: '', trim: true, maxlength: 200 },
      message: { type: String, required: true, maxlength: 5000 },
      read: { type: Boolean, default: false },
    },
    opts
  )
);
