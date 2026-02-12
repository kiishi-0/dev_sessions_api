export interface CodeSubmissionRequest {
  source_code: string;
  language_id: string;
  stdin: string;
}

export interface CodeSubmissionResponse {
  time: number;
  memory: number;
  stdout: string;
  stderr: string;
  execution_message: string;
  compile_output: string;
  status_message: string;
}

export interface CodeExecutionApiSubmitResult {
  source_code: string;
  language_id: number;
  stdin: string;
  expected_output: string | null;
  stdout: string;
  status_id: number;
  created_at: string; // ISO datetime string
  finished_at: string; // ISO datetime string
  time: string; // looks like seconds in string form
  memory: number;
  stderr: string | null;
  token: string;
  number_of_runs: number;
  cpu_time_limit: string;
  cpu_extra_time: string;
  wall_time_limit: string;
  memory_limit: number;
  stack_limit: number;
  max_processes_and_or_threads: number;
  enable_per_process_and_thread_time_limit: boolean;
  enable_per_process_and_thread_memory_limit: boolean;
  max_file_size: number;
  compile_output: string | null;
  exit_code: number;
  exit_signal: number | null;
  message: string | null;
  wall_time: string;
  compiler_options: string | null;
  command_line_arguments: string | null;
  redirect_stderr_to_stdout: boolean;
  callback_url: string | null;
  additional_files: string | null;
  enable_network: boolean;
  post_execution_filesystem: string;
  status: {
    id: number;
    description: string;
  };
  language: {
    id: number;
    name: string;
  };
}
