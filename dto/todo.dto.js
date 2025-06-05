function createTodoDto(raw) {
    return {
      title: raw.title?.trim(),
      description: raw.description?.trim() || null,
      due_date: raw.due_date ? new Date(raw.due_date) : null,
      created_at: new Date(),
      updated_at: new Date()
    };
  }
  function isValidDateString(value) {
    return typeof value === 'string' && value.trim() !== '' && !isNaN(new Date(value).getTime());
  }
  
  function updateTodoDto(raw) {
    const dto = {};
  
    if (typeof raw.title === 'string') {
      dto.title = raw.title.trim();
    }
  
    if (typeof raw.description === 'string') {
      dto.description = raw.description.trim();
    }
    // if (!isValidDateString(raw.due_date)) {
    //   throw new Error('Due date is required and must be a valid date');
    // }
    if (typeof raw.is_completed !== 'undefined') {
      dto.is_completed = !!raw.is_completed;
    }
    dto.updated_at = new Date(); 
    return dto;
  }
  module.exports = { createTodoDto,updateTodoDto };
  